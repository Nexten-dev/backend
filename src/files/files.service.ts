import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './mfile.class';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
    async saveFiles(files: MFile[], nameFolder: string): Promise<FileElementResponse[]> {
        const uploadFolder = `${path}/uploads/${nameFolder}`;
        await ensureDir(uploadFolder);
        const res: FileElementResponse[] = [];
        for (const file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            res.push({ urls: { url: `/uploads/${nameFolder}/${file.originalname}` } });
        }
        return res;
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }

    findImageByUser(userId: number, fileType: FileType) {
        const qb = this.repository.createQueryBuilder('file');

        qb.where('file.userId = :userId', { userId });

        if (fileType === FileType.PHOTOS) {
            qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
        }

        if (fileType === FileType.TRASH) {
            qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
        }

        return qb.getMany();
    }
}
