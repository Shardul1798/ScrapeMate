"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_handler_1 = require("./lib/response.handler");
const nest_winston_1 = require("nest-winston");
const logging_interceptor_1 = require("./interceptors/logging/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    app.useGlobalFilters(new response_handler_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.enableCors();
    app.setGlobalPrefix('/api/v1');
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Web Scrape Mate')
        .setDescription('API for webscraping')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    const PORT = process.env.port || 5001;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map