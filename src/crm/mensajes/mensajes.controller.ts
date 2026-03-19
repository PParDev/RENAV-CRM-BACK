import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(private readonly mensajesService: MensajesService) { }

    @Post()
    create(@Body() body: any) {
        return this.mensajesService.create({
            id_lead: Number(body.id_lead),
            id_usuario: body.id_usuario ? Number(body.id_usuario) : undefined,
            es_entrante: Boolean(body.es_entrante),
            canal: body.canal,
            texto: body.texto,
            media_url: body.media_url,
        });
    }

    @Get('lead/:id')
    findByLead(@Param('id') id: string) {
        return this.mensajesService.findAllByLead(Number(id));
    }
}
