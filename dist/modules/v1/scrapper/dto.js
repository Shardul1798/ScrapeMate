"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapperDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class scrapperDto {
}
exports.scrapperDto = scrapperDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'https://news.yahoo.com/', description: "A valid Web URL" }),
    (0, class_validator_1.IsNotEmpty)({ message: "URL must not be empty!" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(https?|http):\/\/[^\s/$.?#].[^\s]*$/, { message: "Invalid URL!" }),
    __metadata("design:type", String)
], scrapperDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'p', description: 'A valid HTML5 tag elements like html, title, div, body etc.' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tag is required!" }),
    (0, class_validator_1.IsString)({ message: "Invalid Tag!" }),
    __metadata("design:type", String)
], scrapperDto.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'src', description: 'A valid HTML5 tag element attribute like href, src, title etc.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Invalid Attribute!" }),
    __metadata("design:type", String)
], scrapperDto.prototype, "attribute", void 0);
//# sourceMappingURL=dto.js.map