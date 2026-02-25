# Endpoints del Módulo INVENTARIO

La URL base para todos estos endpoints es: `http://localhost:3000/api`

---

## 1. Cities (Ciudades para Inventario)
Ruta principal: `/inventory/cities`

- **POST** `/inventory/cities`
  ```json
  {
    "nombre": "Monterrey",
    "estado": "Nuevo León",
    "codigo": "MTY"
  }
  ```
- **GET** `/inventory/cities` (Soporta query `?search=...`)
- **GET** `/inventory/cities/:id`
- **PATCH** `/inventory/cities/:id`
  ```json
  {
    "estado": "NL"
  }
  ```
- **DELETE** `/inventory/cities/:id`

---

## 2. Developers (Desarrolladores)
Ruta principal: `/inventory/developers`

- **POST** `/inventory/developers`
  ```json
  {
    "nombre": "Grupo Inmobiliario ABC",
    "ubicacion": "Ciudad de México",
    "email": "contacto@grupoabc.com",
    "telefono": "5559998888"
  }
  ```
- **GET** `/inventory/developers` (Soporta query `?search=...`)
- **GET** `/inventory/developers/:id`
- **PATCH** `/inventory/developers/:id`
  ```json
  {
    "telefono": "5557776666"
  }
  ```
- **DELETE** `/inventory/developers/:id`

---

## 3. Developments (Desarrollos)
Ruta principal: `/inventory/developments`

- **POST** `/inventory/developments`
  ```json
  {
    "nombre": "Torre Esmeralda",
    "ciudad": 1,
    "id_desarrollador": 1,
    "id_estado_relac_des": 2,
    "nivel_certeza_legal": 3,
    "cat_estado_doc": 1,
    "id_origen_proyecto": 1,
    "porcentaje_comision": 5.0
  }
  ```
- **POST** `/inventory/developments/:id/typologies` (Agregar tipologías a este desarrollo)
  ```json
  {
    "nombre": "Tipo Vistamar",
    "total_unidades": 50
  }
  ```
- **GET** `/inventory/developments` (Soporta queries `?skip=0&take=10&ciudad=1&desarrollador=2&search=Torre`)
- **GET** `/inventory/developments/:id`
- **PATCH** `/inventory/developments/:id`
  ```json
  {
    "porcentaje_comision": 6.5
  }
  ```
- **DELETE** `/inventory/developments/:id`

---

## 4. Units (Unidades / Lotes / Departamentos)
Ruta principal: `/inventory/units`

- **POST** `/inventory/units`
  ```json
  {
    "id_desarrollo": 1,
    "id_tipologia": 2,
    "codigo_unidad": "A-101",
    "descripcion": "Departamento en planta baja con jardín",
    "direccion": "Edificio A, Nivel 1",
    "m2_terreno": 120.5,
    "m2_construccion": 100.0,
    "moneda": "MXN",
    "precios_lista": 2500000,
    "id_tipo_inmueble": 1,
    "id_estado_unidad": 1,
    "id_tipo_propiedad": 2,
    "fecha_obtencion": "2026-01-15T00:00:00.000Z",
    "fecha_terminacion": "2026-12-01T00:00:00.000Z"
  }
  ```
- **GET** `/inventory/units` (Soporta queries `?skip=0&take=10&desarrolloId=1&codigo=A-101`)
- **GET** `/inventory/units/:id`
- **PATCH** `/inventory/units/:id`
  ```json
  {
    "precios_lista": 2600000,
    "id_estado_unidad": 2
  }
  ```
- **DELETE** `/inventory/units/:id`

---

## 5. Prices (Historial de Precios para una Unidad)
Ruta principal: `/inventory/units/:id/prices`

- **POST** `/inventory/units/:id/prices` (Agrega un nuevo precio en el historial)
  ```json
  {
    "precio": 2600000,
    "vigente_desde": "2026-03-01T00:00:00.000Z",
    "vigente_hasta": "2026-12-31T00:00:00.000Z" // Opcional
  }
  ```
- **GET** `/inventory/units/:id/prices` (Obtiene el histórico de precios de esta unidad)

---

## 6. Sales - Apartados (Apartados de Unidades)
Ruta principal: `/inventory/sales/apartados`

- **POST** `/inventory/sales/apartados`
  ```json
  {
    "id_unidad": 1,
    "id_lead": 1,
    "monto_apartado": 50000,
    "fecha_apartado": "2026-02-25T10:00:00.000Z",
    "vence_en": "2026-03-15T10:00:00.000Z",
    "status": true
  }
  ```
- **GET** `/inventory/sales/apartados` (Soporta query `?leadId=...`)

---

## 7. Sales - Ventas (Cierres de Ventas)
Ruta principal: `/inventory/sales/ventas`

- **POST** `/inventory/sales/ventas`
  ```json
  {
    "id_unidad": 1,
    "id_lead": 1,
    "precio_cierre": 2450000,
    "fecha_cierre": "2026-03-10T15:30:00.000Z",
    "porc_comision": 5.0,
    "monto_comision": 122500
  }
  ```
- **GET** `/inventory/sales/ventas` (Soporta query `?leadId=...`)
