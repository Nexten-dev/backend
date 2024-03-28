import { Module } from '@nestjs/common';
import { FilesModule } from '@files/files.module';
//import { PrismaService } from '@prisma/prisma.service';

@Module({
    imports: [FilesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
