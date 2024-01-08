import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class scrapperDto {
    @ApiProperty({ required: true, example: 'https://news.yahoo.com/', description: "A valid Web URL" })
    @IsNotEmpty({message: "URL must not be empty!"})
    @IsString()
    @Matches(/^(https?|http):\/\/[^\s/$.?#].[^\s]*$/, {message: "Invalid URL!"})
    readonly url:string;

    @ApiProperty({ required: true, example: 'p', description: 'A valid HTML5 tag elements like html, title, div, body etc.' })
    @IsNotEmpty({message: "Tag is required!"})
    @IsString({message: "Invalid Tag!"})
    readonly tag:string;

    @ApiProperty({ required: false, example: 'src', description: 'A valid HTML5 tag element attribute like href, src, title etc.' })
    @IsOptional()
    @IsString({message: "Invalid Attribute!"})
    readonly attribute:string;
}