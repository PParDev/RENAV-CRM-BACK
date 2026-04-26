import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
        fileFilter: (_, file, cb) => {
            // Permitimos documentos multimedia generales e imágenes
            cb(null, true);
        },
    }))
    async upload(@UploadedFile() file: Express.Multer.File, @Body('folder') folder?: string) {
        if (!file) throw new BadRequestException('No se recibió ningún archivo');
        const targetFolder = folder || 'inventory';
        const url = await this.uploadService.uploadFile(file, targetFolder);
        return { url };
    }
}
