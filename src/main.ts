import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser);
    const configService: ConfigService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    const config = new DocumentBuilder().setTitle('Auth').setDescription('').setVersion('1.0').addTag('auth').build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(`${PORT}`);
    console.log(`http://localhost:${PORT}/api#/`);
}
bootstrap();
