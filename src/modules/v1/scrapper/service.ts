import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class scrapeService {
  async fetchDetails(payload: any | string, response) {
    try {
      const { tag, attribute, url } = payload;
      const browser = await puppeteer.launch();
      const page: any = await browser.newPage();
      await page.goto(payload?.url);

      let elementTexts: Array<string> = [];
      let elementAttributes: Array<string> = [];

      if (payload && payload?.tag) {
        const elements = await page.$$(tag);
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          const text = await page.evaluate(
            (element) => element.innerText,
            element,
          );
          elementTexts.push(text);
        }
      }
      if (payload && payload?.attribute) {
        const elements = await page.$$(tag);
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          let value = await page.evaluate(
            (pageItem, attribute) => pageItem.getAttribute(attribute),
            element,
            attribute,
          );
          elementAttributes.push(value);
        }
      }
      // browser.close();

      if (elementTexts.length || elementAttributes.length) {
        let fileContent = ` Data from the URL - \t${url} 
        \n\n\n---------- ${tag}: 
        ${elementTexts}, 
        \n\n\n---------- ${attribute}: 
        ${elementAttributes} `;
        await this.exportScrapeDataToCSV(
          fileContent,
          response,
        );
      }
      return { tag: elementTexts, attribute: elementAttributes };
    } catch (e) {
      return e;
    }
  }

  async exportScrapeDataToCSV(data, response): Promise<string> {
    try {
      const fileName = `scrapeData-${new Date().toISOString()}.json`;
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
      console.log(fileName);
      response.setHeader(
        'Content-Disposition',
        `attachment; filename=${fileName}`,
      );
      response.setHeader('Content-Type', 'application/json');
      fs.createReadStream(fileName).pipe(response.status(200));
      return Promise.resolve(fileName);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
