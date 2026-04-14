import { Controller, Sse, MessageEvent, Res } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { EventsService } from './events.service';
import type { Response } from 'express';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Sse()
    stream(@Res({ passthrough: true }) res: Response): Observable<MessageEvent> {
        // Keep connection alive with CORS headers
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Accel-Buffering', 'no');

        return this.eventsService.getObservable().pipe(
            map((event) => ({
                type: event.type,
                data: JSON.stringify(event.payload),
            })),
        );
    }
}
