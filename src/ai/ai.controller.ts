import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { AiService } from './ai.service';

class ChatDto {
    @IsNumber()
    id_lead: number;

    @IsString()
    mensaje: string;

    @IsBoolean()
    es_entrante: boolean;
}

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('chat')
    async chat(@Body() body: ChatDto) {
        try {
            const result = await this.aiService.chat(
                body.id_lead,
                body.mensaje,
                body.es_entrante ?? true,
            );
            return result;
        } catch (err) {
            throw new HttpException(
                err.message || 'Error al procesar el mensaje con IA',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
