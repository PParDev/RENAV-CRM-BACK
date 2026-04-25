import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

export interface CrmEvent {
    type: 'nuevo_mensaje' | 'nuevo_lead' | 'lead_actualizado' | 'agente_requerido' | 'mensaje_estatus_actualizado';
    payload: any;
}

@Injectable()
export class EventsService {
    private subject = new Subject<CrmEvent>();

    // Emits events to all connected SSE clients
    emit(event: CrmEvent) {
        this.subject.next(event);
    }

    // Returns an Observable that SSE clients subscribe to
    getObservable(): Observable<CrmEvent> {
        return this.subject.asObservable();
    }
}
