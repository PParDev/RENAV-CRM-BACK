import { Module } from '@nestjs/common';
import { TypologiesService } from './typologies.service';
import { TypologiesController } from './typologies.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TypologiesController],
    providers: [TypologiesService],
    exports: [TypologiesService]
})
export class TypologiesModule { }
