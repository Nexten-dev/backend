import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3001;
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    await app.listen(port);
    Logger.log(`🚀 API is running on: http://localhost:${port}/${globalPrefix}`, 'Main');
}
bootstrap();
