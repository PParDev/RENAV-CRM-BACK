# Endpoints del Módulo CATÁLOGOS

La URL base para todos estos endpoints es: `http://localhost:3000/api`
Todas las rutas de catálogos requieren de un `codigo` (string único) y un `nombre` (string descriptivo).

---

## 1. Servicios
Ruta principal: `/catalogs/servicios`

POST: http://localhost:3000/api/catalogs/servicios
{
  "codigo": "SERV-CONST",
  "nombre": "Construcción",
  "activo": true
}

GET: http://localhost:3000/api/catalogs/servicios

GET: http://localhost:3000/api/catalogs/servicios/1

PATCH: http://localhost:3000/api/catalogs/servicios/1
{
  "nombre": "Construcción Residencial",
  "activo": false
}

DELETE: http://localhost:3000/api/catalogs/servicios/1

---

## 2. Métodos de Pago
Ruta principal: `/catalogs/metodos-pago`

POST: http://localhost:3000/api/catalogs/metodos-pago
{
  "codigo": "MP-CRED",
  "nombre": "Crédito Hipotecario"
}

GET: http://localhost:3000/api/catalogs/metodos-pago

GET: http://localhost:3000/api/catalogs/metodos-pago/1

PATCH: http://localhost:3000/api/catalogs/metodos-pago/1
{
  "nombre": "Crédito Bancario"
}

DELETE: http://localhost:3000/api/catalogs/metodos-pago/1

---

## 3. Tipos de Inmueble
Ruta principal: `/catalogs/tipos-inmueble`

POST: http://localhost:3000/api/catalogs/tipos-inmueble
{
  "codigo": "TI-CASA",
  "nombre": "Casa Habitación"
}

GET: http://localhost:3000/api/catalogs/tipos-inmueble

GET: http://localhost:3000/api/catalogs/tipos-inmueble/1

PATCH: http://localhost:3000/api/catalogs/tipos-inmueble/1
{
  "nombre": "Casa Residencial"
}

DELETE: http://localhost:3000/api/catalogs/tipos-inmueble/1

---

## 4. Tipos de Proyecto
Ruta principal: `/catalogs/tipos-proyecto`

POST: http://localhost:3000/api/catalogs/tipos-proyecto
{
  "codigo": "TP-REMO",
  "nombre": "Remodelación"
}

GET: http://localhost:3000/api/catalogs/tipos-proyecto

GET: http://localhost:3000/api/catalogs/tipos-proyecto/1

PATCH: http://localhost:3000/api/catalogs/tipos-proyecto/1
{
  "nombre": "Remodelación Parcial"
}

DELETE: http://localhost:3000/api/catalogs/tipos-proyecto/1

---

## 5. Subtipos Habitacionales
Ruta principal: `/catalogs/subtipos-habitacional`

POST: http://localhost:3000/api/catalogs/subtipos-habitacional
{
  "codigo": "SH-RES",
  "nombre": "Residencial Premium"
}

GET: http://localhost:3000/api/catalogs/subtipos-habitacional

GET: http://localhost:3000/api/catalogs/subtipos-habitacional/1

PATCH: http://localhost:3000/api/catalogs/subtipos-habitacional/1
{
  "nombre": "Residencial Plus"
}

DELETE: http://localhost:3000/api/catalogs/subtipos-habitacional/1

---

## 6. Orígenes de Proyecto
Ruta principal: `/catalogs/origenes-proyecto`

POST: http://localhost:3000/api/catalogs/origenes-proyecto
{
  "codigo": "OP-PROP",
  "nombre": "Propio"
}

GET: http://localhost:3000/api/catalogs/origenes-proyecto

PATCH: http://localhost:3000/api/catalogs/origenes-proyecto/1
{
  "nombre": "Desarrollo Propio"
}

DELETE: http://localhost:3000/api/catalogs/origenes-proyecto/1

---

## 7. Estados de Unidad
Ruta principal: `/catalogs/estados-unidad`

POST: http://localhost:3000/api/catalogs/estados-unidad
{
  "codigo": "EU-DISP",
  "nombre": "Disponible"
}

GET: http://localhost:3000/api/catalogs/estados-unidad

PATCH: http://localhost:3000/api/catalogs/estados-unidad/1
{
  "nombre": "Disponible Venta"
}

DELETE: http://localhost:3000/api/catalogs/estados-unidad/1

---

## 8. Estados de Relación del Desarrollador
Ruta principal: `/catalogs/estados-relacion-desarrollador`

POST: http://localhost:3000/api/catalogs/estados-relacion-desarrollador
{
  "codigo": "ERD-ACT",
  "nombre": "Activo"
}

GET: http://localhost:3000/api/catalogs/estados-relacion-desarrollador

PATCH: http://localhost:3000/api/catalogs/estados-relacion-desarrollador/1
{
  "nombre": "Activo Exclusivo"
}

DELETE: http://localhost:3000/api/catalogs/estados-relacion-desarrollador/1

---

## 9. Niveles de Certeza Legal
Ruta principal: `/catalogs/niveles-certeza-legal`

POST: http://localhost:3000/api/catalogs/niveles-certeza-legal
{
  "codigo": "NCL-ALTO",
  "nombre": "Alto - Escriturado"
}

GET: http://localhost:3000/api/catalogs/niveles-certeza-legal

PATCH: http://localhost:3000/api/catalogs/niveles-certeza-legal/1
{
  "nombre": "Alto - Escritura Pública"
}

DELETE: http://localhost:3000/api/catalogs/niveles-certeza-legal/1

---

## 10. Estados de Documentación
Ruta principal: `/catalogs/estados-documentacion`

POST: http://localhost:3000/api/catalogs/estados-documentacion
{
  "codigo": "ED-COMP",
  "nombre": "Completa"
}

GET: http://localhost:3000/api/catalogs/estados-documentacion

PATCH: http://localhost:3000/api/catalogs/estados-documentacion/1
{
  "nombre": "Documentación Completa"
}

DELETE: http://localhost:3000/api/catalogs/estados-documentacion/1

---

## 11. Tipos de Propiedad (Específico)
Ruta principal: `/catalogs/tipos-propiedad`

POST: http://localhost:3000/api/catalogs/tipos-propiedad
{
  "codigo": "TPR-DEP",
  "nombre": "Departamento",
  "id_subtipo_habitacional": 1, 
  "id_tipo_proyecto": 1 
}

GET: http://localhost:3000/api/catalogs/tipos-propiedad

PATCH: http://localhost:3000/api/catalogs/tipos-propiedad/1
{
  "nombre": "Departamento Penthouse"
}

DELETE: http://localhost:3000/api/catalogs/tipos-propiedad/1
