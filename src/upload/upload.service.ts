import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadService {
    private s3: S3Client;
    private bucket: string;
    private region: string;

    constructor(private config: ConfigService) {
        this.region = config.getOrThrow<string>('AWS_REGION');
        this.bucket = config.getOrThrow<string>('S3_BUCKET');
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId:     config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }

    async uploadFile(file: Express.Multer.File, folder = 'inventory'): Promise<string> {
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        const key = `${folder}/${randomUUID()}${ext}`;

        await this.s3.send(new PutObjectCommand({
            Bucket:      this.bucket,
            Key:         key,
            Body:        file.buffer,
            ContentType: file.mimetype,
        }));

        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }
}
