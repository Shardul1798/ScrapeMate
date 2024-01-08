"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_1 = require("puppeteer");
const fs = require("fs");
let scrapeService = class scrapeService {
    async fetchDetails(payload, response) {
        try {
            const { tag, attribute, url } = payload;
            const browser = await puppeteer_1.default.launch();
            const page = await browser.newPage();
            await page.goto(payload?.url);
            let elementTexts = [];
            let elementAttributes = [];
            if (payload && payload?.tag) {
                const elements = await page.$$(tag);
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index];
                    const text = await page.evaluate((element) => element.innerText, element);
                    elementTexts.push(text);
                }
            }
            if (payload && payload?.attribute) {
                const elements = await page.$$(tag);
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index];
                    let value = await page.evaluate((pageItem, attribute) => pageItem.getAttribute(attribute), element, attribute);
                    elementAttributes.push(value);
                }
            }
            if (elementTexts.length || elementAttributes.length) {
                let fileContent = ` Data from the URL - \t${url} 
        \n\n\n---------- ${tag}: 
        ${elementTexts}, 
        \n\n\n---------- ${attribute}: 
        ${elementAttributes} `;
                await this.exportScrapeDataToCSV(fileContent, response);
            }
            return { tag: elementTexts, attribute: elementAttributes };
        }
        catch (e) {
            return e;
        }
    }
    async exportScrapeDataToCSV(data, response) {
        try {
            const fileName = `scrapeData-${new Date().toISOString()}.json`;
            fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
            console.log(fileName);
            response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            response.setHeader('Content-Type', 'application/json');
            fs.createReadStream(fileName).pipe(response.status(200));
            return Promise.resolve(fileName);
        }
        catch (error) {
            Promise.reject(error);
        }
    }
};
exports.scrapeService = scrapeService;
exports.scrapeService = scrapeService = __decorate([
    (0, common_1.Injectable)()
], scrapeService);
//# sourceMappingURL=service.js.map