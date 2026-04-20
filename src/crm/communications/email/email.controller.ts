import { Controller, Get, Post, Body, Param, ParseIntPipe, Request, UseInterceptors, UploadedFiles, Delete, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Communications - Email')
@Controller('communications/email')
@ApiBearerAuth()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar un correo electrónico con adjuntos' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachments'))
  sendEmail(
    @Body() sendEmailDto: SendEmailDto, 
    @UploadedFiles() attachments: Express.Multer.File[],
    @Request() req
  ) {
    this.logger.log('Petición recibida en /send');
    this.logger.log('Body:', JSON.stringify(sendEmailDto));
    
    return this.emailService.sendEmail(sendEmailDto, attachments, req.user?.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Obtener historial global de correos' })
  getAllHistory() {
    return this.emailService.getAllHistory();
  }

  @Get('history/lead/:id')
  @ApiOperation({ summary: 'Obtener historial de correos de un lead específico' })
  getHistoryByLead(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.getHistoryByLead(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar correo del historial (soft delete)' })
  deleteEmail(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.deleteMessage(id);
  }
}
