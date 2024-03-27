import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
