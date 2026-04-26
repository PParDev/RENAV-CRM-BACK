import { Controller, Get, Patch, Post, Body } from '@nestjs/common';
import { AiConfigService, AiConfig } from './ai-config.service';

@Controller('ai/config')
export class AiConfigController {
    constructor(private readonly aiConfigService: AiConfigService) {}

    @Get()
    getConfig() {
        return this.aiConfigService.getConfig();
    }

    @Patch()
    updateConfig(@Body() body: Partial<AiConfig>) {
        return this.aiConfigService.updateConfig(body);
    }

    @Post('reset')
    resetConfig() {
        return this.aiConfigService.resetConfig();
    }
}
