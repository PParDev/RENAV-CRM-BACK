import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

export interface CrmEvent {
    type: 'nuevo_mensaje' | 'nuevo_lead' | 'lead_actualizado' | 'agente_requerido' | 'mensaje_estatus_actualizado' | 'ping';
    payload: any;
}

@Injectable()
export class EventsService implements OnModuleInit, OnModuleDestroy {
    private subject = new Subject<CrmEvent>();
    private heartbeatInterval: NodeJS.Timeout;

    onModuleInit() {
        // Enviar un ping cada 20 segundos para mantener la conexión SSE abierta (Heartbeat)
        // Esto evita que los navegadores, Proxys o Nginx desconecten el web-socket por inactividad.
        this.heartbeatInterval = setInterval(() => {
            this.emit({ type: 'ping', payload: { timestamp: new Date().toISOString() } });
        }, 20000);
    }

    onModuleDestroy() {
        clearInterval(this.heartbeatInterval);
    }

    // Emits events to all connected SSE clients
    emit(event: CrmEvent) {
        this.subject.next(event);
    }

    // Returns an Observable that SSE clients subscribe to
    getObservable(): Observable<CrmEvent> {
        return this.subject.asObservable();
    }
}
