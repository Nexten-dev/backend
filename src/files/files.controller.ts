import {
    Controller,
    Get,
    HttpCode,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1024 * 1024 * 10,
                        message: 'Validation Failed (this file is larger than 10MB)',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Query('folder') nameFolder: string,
    ): Promise<FileElementResponse[]> {
        const saveArray: MFile[] = [new MFile(file)];
        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer);
            saveArray.push(
                new MFile({
                    originalname: `${file.originalname.split('.')[0]}.webp`,
                    buffer,
                }),
            );
        }
        return this.filesService.saveFiles(saveArray, nameFolder);
    }

    @Get()
    
}
