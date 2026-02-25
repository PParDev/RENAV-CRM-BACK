# Endpoints del Módulo CRM

## 1. Leads (Prospectos)
POST: http://localhost:3000/api/leads
{
  "id_contacto": 1,
  "id_servicio_principal": 5,
  "estado": "NUEVO",
  "prioridad": "ALTA",
  "id_usuario_asignado": 2,
  "notas_iniciales": "Cliente referido interesado en casa zona norte"
}

GET: http://localhost:3000/api/leads?take=10&skip=0&estado=NUEVO&usuario=2&search=Juan

GET: http://localhost:3000/api/leads/1

PATCH: http://localhost:3000/api/leads/1
{
  "estado": "CONTACTADO",
  "prioridad": "URGENTE"
}

DELETE: http://localhost:3000/api/leads/1

---

## 2. Contacts (Contactos)
POST: http://localhost:3000/api/contacts
{
  "nombre": "Juan Pérez",
  "correo": "juan.perez@email.com",
  "telefono": "5551234567",
  "origen": "Meta Ads",
  "ciudad": "Ciudad de México"
}

GET: http://localhost:3000/api/contacts

GET: http://localhost:3000/api/contacts/1

PATCH: http://localhost:3000/api/contacts/1
{
  "telefono": "5559876543",
  "origen": "Recomendación"
}

DELETE: http://localhost:3000/api/contacts/1

---

## 3. Activities (Actividades)
POST: http://localhost:3000/api/activities
{
  "id_lead": 1,
  "tipo": "WHATSAPP",
  "descripcion": "Se envió el brochure del desarrollo.",
  "programada_para": "2026-03-01T10:00:00Z",
  "creada_por": 2
}

GET: http://localhost:3000/api/activities?leadId=1&userId=2

GET: http://localhost:3000/api/activities/1

PATCH: http://localhost:3000/api/activities/1
{
  "realizada_en": "2026-03-01T10:15:00Z"
}

DELETE: http://localhost:3000/api/activities/1

---

## 4. Service Requests (Solicitudes de Servicios / Cotizaciones)
POST: http://localhost:3000/api/service-requests
{
  "id_lead": 1,
  "id_servicio": 2,
  "presupuesto_min": 1000000,
  "presupuesto_max": 2500000,
  "id_metodo_pago": 1,
  "ciudad": "Guadalajara",
  "zona": "Providencia",
  "ubicacion_texto": "Av. Principal #123",
  "construccion": {
    "tiene_proyecto": true,
    "superficie_m2": 150,
    "construccion_inmediata": false
  }
}

GET: http://localhost:3000/api/service-requests/lead/1

---

## 5. Users (Vendedores / Administradores)
POST: http://localhost:3000/api/users
{
  "nombre": "Ana Gómez",
  "email": "ana@empresa.com",
  "password": "Password123!",
  "role": "SALES",
  "telefono": "5551122334"
}

GET: http://localhost:3000/api/users

GET: http://localhost:3000/api/users/1

PATCH: http://localhost:3000/api/users/1
{
  "role": "MANAGER",
  "isActive": false
}

DELETE: http://localhost:3000/api/users/1

---

## 6. Pipelines (Etapas del Embudo)
POST: http://localhost:3000/api/pipelines
{
  "id_servicio": 1,
  "nombre": "Cita Agendada",
  "orden": 2,
  "activo": true
}

GET: http://localhost:3000/api/pipelines

GET: http://localhost:3000/api/pipelines/1

PATCH: http://localhost:3000/api/pipelines/1
{
  "orden": 1,
  "nombre": "Primer Contacto Efectivo"
}

DELETE: http://localhost:3000/api/pipelines/1

---

## 7. Lead History (Historial de cambios de Etapa)
POST: http://localhost:3000/api/lead-history
{
  "id_lead": 1,
  "id_etapa": 3,
  "cambiado_por": 2
}

GET: http://localhost:3000/api/lead-history?leadId=1

GET: http://localhost:3000/api/lead-history/1

PATCH: http://localhost:3000/api/lead-history/1
{
  "id_etapa": 4
}

DELETE: http://localhost:3000/api/lead-history/1

---

## 8. Lead Services (Servicios Adicionales del Lead)
POST: http://localhost:3000/api/lead-services
{
  "id_lead": 1,
  "id_servicio": 3,
  "es_principal": false
}

GET: http://localhost:3000/api/lead-services?leadId=1

GET: http://localhost:3000/api/lead-services/1

PATCH: http://localhost:3000/api/lead-services/1
{
  "es_principal": true
}

DELETE: http://localhost:3000/api/lead-services/1
