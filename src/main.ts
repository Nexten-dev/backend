import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    const config = new DocumentBuilder().setTitle('Auth').setDescription('').setVersion('1.0').addTag('auth').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const PORT = configService.get('PORT');
    await app.listen(`${PORT}`);
    console.log(`http://localhost:${PORT}/api#/`);
}
bootstrap();
