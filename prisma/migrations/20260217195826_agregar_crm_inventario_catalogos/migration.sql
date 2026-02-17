-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cat";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "crm";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "inv";

-- CreateTable
CREATE TABLE "cat"."cat_servicios" (
    "id_servicio" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cat_servicios_pkey" PRIMARY KEY ("id_servicio")
);

-- CreateTable
CREATE TABLE "cat"."cat_met_pago" (
    "id_metodo_pago" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_met_pago_pkey" PRIMARY KEY ("id_metodo_pago")
);

-- CreateTable
CREATE TABLE "cat"."cat_tipo_inmueble" (
    "id_tipo_inmueble" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_tipo_inmueble_pkey" PRIMARY KEY ("id_tipo_inmueble")
);

-- CreateTable
CREATE TABLE "cat"."cat_tipo_proyecto" (
    "id_tipo_proyecto" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_tipo_proyecto_pkey" PRIMARY KEY ("id_tipo_proyecto")
);

-- CreateTable
CREATE TABLE "cat"."cat_tipo_propiedad" (
    "id_tipo_propiedad" SERIAL NOT NULL,
    "tenencia" TEXT,
    "uso" TEXT,
    "tipologia" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "cat_tipo_propiedad_pkey" PRIMARY KEY ("id_tipo_propiedad")
);

-- CreateTable
CREATE TABLE "cat"."cat_origen_proyecto" (
    "id_origen_proyecto" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_origen_proyecto_pkey" PRIMARY KEY ("id_origen_proyecto")
);

-- CreateTable
CREATE TABLE "cat"."cat_estado_unidad" (
    "id_estado_unidad" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_estado_unidad_pkey" PRIMARY KEY ("id_estado_unidad")
);

-- CreateTable
CREATE TABLE "cat"."cat_estado_relacion_desarrollador" (
    "id_estado" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_estado_relacion_desarrollador_pkey" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "cat"."cat_niv_certeza_legal" (
    "id_nivel" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_niv_certeza_legal_pkey" PRIMARY KEY ("id_nivel")
);

-- CreateTable
CREATE TABLE "cat"."cat_estado_doc" (
    "id_estado_doc" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_estado_doc_pkey" PRIMARY KEY ("id_estado_doc")
);

-- CreateTable
CREATE TABLE "cat"."cat_subtipo_habitacional" (
    "id_subtipo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "cat_subtipo_habitacional_pkey" PRIMARY KEY ("id_subtipo")
);

-- CreateTable
CREATE TABLE "crm"."crm_contacto" (
    "id_contacto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT,
    "telefono" TEXT,
    "origen" TEXT,
    "ciudad" TEXT,
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_contacto_pkey" PRIMARY KEY ("id_contacto")
);

-- CreateTable
CREATE TABLE "crm"."crm_usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "rol" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "crm"."crm_lead" (
    "id_lead" SERIAL NOT NULL,
    "id_contacto" INTEGER NOT NULL,
    "id_servicio_principal" INTEGER,
    "estado" TEXT NOT NULL,
    "prioridad" TEXT NOT NULL,
    "id_usuario_asignado" INTEGER,
    "notas_iniciales" TEXT,
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_lead_pkey" PRIMARY KEY ("id_lead")
);

-- CreateTable
CREATE TABLE "crm"."crm_lead_servicio" (
    "id_lead_servicio" SERIAL NOT NULL,
    "id_lead" INTEGER NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_lead_servicio_pkey" PRIMARY KEY ("id_lead_servicio")
);

-- CreateTable
CREATE TABLE "crm"."crm_etapa_pipeline" (
    "id_etapa" SERIAL NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "crm_etapa_pipeline_pkey" PRIMARY KEY ("id_etapa")
);

-- CreateTable
CREATE TABLE "crm"."crm_historial_etapa_lead" (
    "id_historial" SERIAL NOT NULL,
    "id_lead" INTEGER NOT NULL,
    "id_etapa" INTEGER NOT NULL,
    "cambiado_por" INTEGER,
    "cambiado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_historial_etapa_lead_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "crm"."crm_actividad" (
    "id_actividad" SERIAL NOT NULL,
    "id_lead" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "programada_para" TIMESTAMPTZ,
    "realizada_en" TIMESTAMPTZ,
    "creada_por" INTEGER,
    "creada_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_actividad_pkey" PRIMARY KEY ("id_actividad")
);

-- CreateTable
CREATE TABLE "crm"."crm_solicitud_servicio" (
    "id_solicitud" SERIAL NOT NULL,
    "id_lead" INTEGER NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "presupuesto_min" DECIMAL(14,2),
    "presupuesto_max" DECIMAL(14,2),
    "id_metodo_pago" INTEGER,
    "ciudad" TEXT,
    "zona" TEXT,
    "ubicacion_texto" TEXT,
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crm_solicitud_servicio_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "crm"."crm_solicitud_arquitectura" (
    "id_solicitud" INTEGER NOT NULL,
    "frente_m" DECIMAL(12,2),
    "fondo_m" DECIMAL(12,2),
    "superficie_m2" DECIMAL(12,2),
    "ubicacion" TEXT,
    "zona" TEXT,
    "conoce_compatibilidad_urbanistica" BOOLEAN,
    "id_tipo_proyecto" INTEGER,
    "id_subtipo_habitacional" INTEGER,
    "proyectar_y_construir_inmediato" BOOLEAN,

    CONSTRAINT "crm_solicitud_arquitectura_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "crm"."crm_solicitud_construccion" (
    "id_solicitud" INTEGER NOT NULL,
    "tiene_proyecto" BOOLEAN,
    "frente_m" DECIMAL(12,2),
    "fondo_m" DECIMAL(12,2),
    "superficie_m2" DECIMAL(12,2),
    "ubicacion" TEXT,
    "zona" TEXT,
    "conoce_compatibilidad_urbanistica" BOOLEAN,
    "id_tipo_proyecto" INTEGER,
    "id_subtipo_habitacional" INTEGER,
    "construccion_inmediata" BOOLEAN,

    CONSTRAINT "crm_solicitud_construccion_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "crm"."crm_solicitud_avaluo" (
    "id_solicitud" INTEGER NOT NULL,
    "tipo_bien" TEXT,
    "ubicacion" TEXT,
    "zona" TEXT,
    "frente_m" DECIMAL(12,2),
    "fondo_m" DECIMAL(12,2),
    "superficie_m2" DECIMAL(12,2),
    "terreno_topografia" TEXT,
    "terreno_forma" TEXT,
    "superficie_construida_m2" DECIMAL(12,2),
    "fecha_visita" DATE,
    "temporalidad_entrega" TEXT,

    CONSTRAINT "crm_solicitud_avaluo_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "crm"."crm_solicitud_bienes_raices" (
    "id_solicitud" INTEGER NOT NULL,
    "id_tipo_inmueble" INTEGER,
    "ciudad" TEXT,
    "zona" TEXT,
    "ubicacion" TEXT,
    "frente_m" DECIMAL(12,2),
    "fondo_m" DECIMAL(12,2),
    "superficie_m2" DECIMAL(12,2),
    "recamaras" INTEGER,
    "banos" INTEGER,
    "estacionamientos" INTEGER,
    "m2_construidos_requeridos" DECIMAL(12,2),

    CONSTRAINT "crm_solicitud_bienes_raices_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "inv"."inv_ciudad" (
    "id_inv_ciudad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" TEXT,
    "codigo" TEXT,

    CONSTRAINT "inv_ciudad_pkey" PRIMARY KEY ("id_inv_ciudad")
);

-- CreateTable
CREATE TABLE "inv"."inv_desarrollador" (
    "id_desarrollador" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT,
    "email" TEXT,
    "telefono" TEXT,

    CONSTRAINT "inv_desarrollador_pkey" PRIMARY KEY ("id_desarrollador")
);

-- CreateTable
CREATE TABLE "inv"."inv_desarrollo" (
    "id_desarrollo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" INTEGER,
    "id_desarrollador" INTEGER,
    "id_estado_relac_des" INTEGER,
    "nivel_certeza_legal" INTEGER,
    "cat_estado_doc" INTEGER,
    "id_origen_proyecto" INTEGER,
    "porcentaje_comision" DECIMAL(8,4),
    "creado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inv_desarrollo_pkey" PRIMARY KEY ("id_desarrollo")
);

-- CreateTable
CREATE TABLE "inv"."inv_tipologia" (
    "id_tipologia" SERIAL NOT NULL,
    "id_desarrollo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "total_unidades" INTEGER,

    CONSTRAINT "inv_tipologia_pkey" PRIMARY KEY ("id_tipologia")
);

-- CreateTable
CREATE TABLE "inv"."inv_unidad" (
    "id_unidad" SERIAL NOT NULL,
    "id_desarrollo" INTEGER NOT NULL,
    "id_tipologia" INTEGER,
    "codigo_unidad" TEXT,
    "descripcion" TEXT,
    "direccion" TEXT,
    "m2_terreno" DECIMAL(12,2),
    "m2_construccion" DECIMAL(12,2),
    "moneda" TEXT,
    "precios_lista" DECIMAL(14,2),
    "creado_actualizado_en" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_tipo_inmueble" INTEGER,
    "id_estado_unidad" INTEGER,
    "id_tipo_propiedad" INTEGER,
    "fecha_obtencion" DATE,
    "fecha_terminacion" DATE,

    CONSTRAINT "inv_unidad_pkey" PRIMARY KEY ("id_unidad")
);

-- CreateTable
CREATE TABLE "inv"."inv_precio_historico" (
    "id_precio_historico" SERIAL NOT NULL,
    "id_unidad" INTEGER NOT NULL,
    "precio" DECIMAL(14,2) NOT NULL,
    "vigente_desde" DATE NOT NULL,
    "vigente_hasta" DATE,

    CONSTRAINT "inv_precio_historico_pkey" PRIMARY KEY ("id_precio_historico")
);

-- CreateTable
CREATE TABLE "inv"."inv_apartado" (
    "id_apartado" SERIAL NOT NULL,
    "id_unidad" INTEGER NOT NULL,
    "id_lead" INTEGER,
    "monto_apartado" DECIMAL(14,2),
    "fecha_apartado" DATE,
    "vence_en" DATE,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "inv_apartado_pkey" PRIMARY KEY ("id_apartado")
);

-- CreateTable
CREATE TABLE "inv"."inv_venta" (
    "id_venta" SERIAL NOT NULL,
    "id_unidad" INTEGER NOT NULL,
    "id_lead" INTEGER,
    "precio_cierre" DECIMAL(14,2),
    "fecha_cierre" DATE,
    "porc_comision" DECIMAL(8,4),
    "monto_comision" DECIMAL(14,2),

    CONSTRAINT "inv_venta_pkey" PRIMARY KEY ("id_venta")
);

-- CreateIndex
CREATE UNIQUE INDEX "cat_servicios_codigo_key" ON "cat"."cat_servicios"("codigo");

-- CreateIndex
CREATE INDEX "cat_servicios_activo_idx" ON "cat"."cat_servicios"("activo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_met_pago_codigo_key" ON "cat"."cat_met_pago"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_tipo_inmueble_codigo_key" ON "cat"."cat_tipo_inmueble"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_tipo_proyecto_codigo_key" ON "cat"."cat_tipo_proyecto"("codigo");

-- CreateIndex
CREATE INDEX "cat_tipo_propiedad_uso_idx" ON "cat"."cat_tipo_propiedad"("uso");

-- CreateIndex
CREATE UNIQUE INDEX "cat_origen_proyecto_codigo_key" ON "cat"."cat_origen_proyecto"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_estado_unidad_codigo_key" ON "cat"."cat_estado_unidad"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_estado_relacion_desarrollador_codigo_key" ON "cat"."cat_estado_relacion_desarrollador"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_niv_certeza_legal_codigo_key" ON "cat"."cat_niv_certeza_legal"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_estado_doc_codigo_key" ON "cat"."cat_estado_doc"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cat_subtipo_habitacional_codigo_key" ON "cat"."cat_subtipo_habitacional"("codigo");

-- CreateIndex
CREATE INDEX "cat_subtipo_habitacional_nombre_idx" ON "cat"."cat_subtipo_habitacional"("nombre");

-- CreateIndex
CREATE INDEX "crm_contacto_telefono_idx" ON "crm"."crm_contacto"("telefono");

-- CreateIndex
CREATE INDEX "crm_contacto_correo_idx" ON "crm"."crm_contacto"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "crm_usuario_email_key" ON "crm"."crm_usuario"("email");

-- CreateIndex
CREATE INDEX "crm_lead_id_contacto_idx" ON "crm"."crm_lead"("id_contacto");

-- CreateIndex
CREATE INDEX "crm_lead_id_usuario_asignado_idx" ON "crm"."crm_lead"("id_usuario_asignado");

-- CreateIndex
CREATE INDEX "crm_lead_id_servicio_principal_idx" ON "crm"."crm_lead"("id_servicio_principal");

-- CreateIndex
CREATE INDEX "crm_lead_estado_idx" ON "crm"."crm_lead"("estado");

-- CreateIndex
CREATE INDEX "crm_lead_creado_en_idx" ON "crm"."crm_lead"("creado_en");

-- CreateIndex
CREATE UNIQUE INDEX "crm_lead_servicio_id_lead_id_servicio_key" ON "crm"."crm_lead_servicio"("id_lead", "id_servicio");

-- CreateIndex
CREATE UNIQUE INDEX "crm_etapa_pipeline_id_servicio_orden_key" ON "crm"."crm_etapa_pipeline"("id_servicio", "orden");

-- CreateIndex
CREATE INDEX "crm_historial_etapa_lead_id_lead_idx" ON "crm"."crm_historial_etapa_lead"("id_lead");

-- CreateIndex
CREATE INDEX "crm_historial_etapa_lead_id_etapa_idx" ON "crm"."crm_historial_etapa_lead"("id_etapa");

-- CreateIndex
CREATE INDEX "crm_actividad_id_lead_idx" ON "crm"."crm_actividad"("id_lead");

-- CreateIndex
CREATE INDEX "crm_actividad_programada_para_idx" ON "crm"."crm_actividad"("programada_para");

-- CreateIndex
CREATE INDEX "crm_solicitud_servicio_id_lead_idx" ON "crm"."crm_solicitud_servicio"("id_lead");

-- CreateIndex
CREATE INDEX "crm_solicitud_servicio_id_servicio_idx" ON "crm"."crm_solicitud_servicio"("id_servicio");

-- CreateIndex
CREATE UNIQUE INDEX "inv_ciudad_codigo_key" ON "inv"."inv_ciudad"("codigo");

-- CreateIndex
CREATE INDEX "inv_ciudad_nombre_idx" ON "inv"."inv_ciudad"("nombre");

-- CreateIndex
CREATE INDEX "inv_desarrollador_nombre_idx" ON "inv"."inv_desarrollador"("nombre");

-- CreateIndex
CREATE INDEX "inv_desarrollo_ciudad_idx" ON "inv"."inv_desarrollo"("ciudad");

-- CreateIndex
CREATE INDEX "inv_desarrollo_id_desarrollador_idx" ON "inv"."inv_desarrollo"("id_desarrollador");

-- CreateIndex
CREATE INDEX "inv_desarrollo_id_origen_proyecto_idx" ON "inv"."inv_desarrollo"("id_origen_proyecto");

-- CreateIndex
CREATE INDEX "inv_desarrollo_creado_en_idx" ON "inv"."inv_desarrollo"("creado_en");

-- CreateIndex
CREATE INDEX "inv_tipologia_id_desarrollo_idx" ON "inv"."inv_tipologia"("id_desarrollo");

-- CreateIndex
CREATE INDEX "inv_unidad_id_desarrollo_idx" ON "inv"."inv_unidad"("id_desarrollo");

-- CreateIndex
CREATE INDEX "inv_unidad_id_tipologia_idx" ON "inv"."inv_unidad"("id_tipologia");

-- CreateIndex
CREATE INDEX "inv_unidad_id_estado_unidad_idx" ON "inv"."inv_unidad"("id_estado_unidad");

-- CreateIndex
CREATE INDEX "inv_unidad_id_tipo_inmueble_idx" ON "inv"."inv_unidad"("id_tipo_inmueble");

-- CreateIndex
CREATE INDEX "inv_unidad_precios_lista_idx" ON "inv"."inv_unidad"("precios_lista");

-- CreateIndex
CREATE INDEX "inv_unidad_fecha_obtencion_idx" ON "inv"."inv_unidad"("fecha_obtencion");

-- CreateIndex
CREATE UNIQUE INDEX "inv_unidad_id_desarrollo_codigo_unidad_key" ON "inv"."inv_unidad"("id_desarrollo", "codigo_unidad");

-- CreateIndex
CREATE INDEX "inv_precio_historico_id_unidad_idx" ON "inv"."inv_precio_historico"("id_unidad");

-- CreateIndex
CREATE INDEX "inv_precio_historico_vigente_desde_vigente_hasta_idx" ON "inv"."inv_precio_historico"("vigente_desde", "vigente_hasta");

-- CreateIndex
CREATE INDEX "inv_apartado_id_unidad_idx" ON "inv"."inv_apartado"("id_unidad");

-- CreateIndex
CREATE INDEX "inv_apartado_id_lead_idx" ON "inv"."inv_apartado"("id_lead");

-- CreateIndex
CREATE INDEX "inv_apartado_status_idx" ON "inv"."inv_apartado"("status");

-- CreateIndex
CREATE UNIQUE INDEX "inv_venta_id_unidad_key" ON "inv"."inv_venta"("id_unidad");

-- CreateIndex
CREATE INDEX "inv_venta_id_unidad_idx" ON "inv"."inv_venta"("id_unidad");

-- CreateIndex
CREATE INDEX "inv_venta_id_lead_idx" ON "inv"."inv_venta"("id_lead");

-- CreateIndex
CREATE INDEX "inv_venta_fecha_cierre_idx" ON "inv"."inv_venta"("fecha_cierre");

-- AddForeignKey
ALTER TABLE "crm"."crm_lead" ADD CONSTRAINT "crm_lead_id_contacto_fkey" FOREIGN KEY ("id_contacto") REFERENCES "crm"."crm_contacto"("id_contacto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_lead" ADD CONSTRAINT "crm_lead_id_usuario_asignado_fkey" FOREIGN KEY ("id_usuario_asignado") REFERENCES "crm"."crm_usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_lead" ADD CONSTRAINT "crm_lead_id_servicio_principal_fkey" FOREIGN KEY ("id_servicio_principal") REFERENCES "cat"."cat_servicios"("id_servicio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_lead_servicio" ADD CONSTRAINT "crm_lead_servicio_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_lead_servicio" ADD CONSTRAINT "crm_lead_servicio_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "cat"."cat_servicios"("id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_etapa_pipeline" ADD CONSTRAINT "crm_etapa_pipeline_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "cat"."cat_servicios"("id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_historial_etapa_lead" ADD CONSTRAINT "crm_historial_etapa_lead_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_historial_etapa_lead" ADD CONSTRAINT "crm_historial_etapa_lead_id_etapa_fkey" FOREIGN KEY ("id_etapa") REFERENCES "crm"."crm_etapa_pipeline"("id_etapa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_historial_etapa_lead" ADD CONSTRAINT "crm_historial_etapa_lead_cambiado_por_fkey" FOREIGN KEY ("cambiado_por") REFERENCES "crm"."crm_usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_actividad" ADD CONSTRAINT "crm_actividad_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_actividad" ADD CONSTRAINT "crm_actividad_creada_por_fkey" FOREIGN KEY ("creada_por") REFERENCES "crm"."crm_usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_servicio" ADD CONSTRAINT "crm_solicitud_servicio_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_servicio" ADD CONSTRAINT "crm_solicitud_servicio_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "cat"."cat_servicios"("id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_servicio" ADD CONSTRAINT "crm_solicitud_servicio_id_metodo_pago_fkey" FOREIGN KEY ("id_metodo_pago") REFERENCES "cat"."cat_met_pago"("id_metodo_pago") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_arquitectura" ADD CONSTRAINT "crm_solicitud_arquitectura_id_solicitud_fkey" FOREIGN KEY ("id_solicitud") REFERENCES "crm"."crm_solicitud_servicio"("id_solicitud") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_arquitectura" ADD CONSTRAINT "crm_solicitud_arquitectura_id_tipo_proyecto_fkey" FOREIGN KEY ("id_tipo_proyecto") REFERENCES "cat"."cat_tipo_proyecto"("id_tipo_proyecto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_arquitectura" ADD CONSTRAINT "crm_solicitud_arquitectura_id_subtipo_habitacional_fkey" FOREIGN KEY ("id_subtipo_habitacional") REFERENCES "cat"."cat_subtipo_habitacional"("id_subtipo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_construccion" ADD CONSTRAINT "crm_solicitud_construccion_id_solicitud_fkey" FOREIGN KEY ("id_solicitud") REFERENCES "crm"."crm_solicitud_servicio"("id_solicitud") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_construccion" ADD CONSTRAINT "crm_solicitud_construccion_id_tipo_proyecto_fkey" FOREIGN KEY ("id_tipo_proyecto") REFERENCES "cat"."cat_tipo_proyecto"("id_tipo_proyecto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_construccion" ADD CONSTRAINT "crm_solicitud_construccion_id_subtipo_habitacional_fkey" FOREIGN KEY ("id_subtipo_habitacional") REFERENCES "cat"."cat_subtipo_habitacional"("id_subtipo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_avaluo" ADD CONSTRAINT "crm_solicitud_avaluo_id_solicitud_fkey" FOREIGN KEY ("id_solicitud") REFERENCES "crm"."crm_solicitud_servicio"("id_solicitud") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_bienes_raices" ADD CONSTRAINT "crm_solicitud_bienes_raices_id_solicitud_fkey" FOREIGN KEY ("id_solicitud") REFERENCES "crm"."crm_solicitud_servicio"("id_solicitud") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm"."crm_solicitud_bienes_raices" ADD CONSTRAINT "crm_solicitud_bienes_raices_id_tipo_inmueble_fkey" FOREIGN KEY ("id_tipo_inmueble") REFERENCES "cat"."cat_tipo_inmueble"("id_tipo_inmueble") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_ciudad_fkey" FOREIGN KEY ("ciudad") REFERENCES "inv"."inv_ciudad"("id_inv_ciudad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_id_desarrollador_fkey" FOREIGN KEY ("id_desarrollador") REFERENCES "inv"."inv_desarrollador"("id_desarrollador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_id_estado_relac_des_fkey" FOREIGN KEY ("id_estado_relac_des") REFERENCES "cat"."cat_estado_relacion_desarrollador"("id_estado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_nivel_certeza_legal_fkey" FOREIGN KEY ("nivel_certeza_legal") REFERENCES "cat"."cat_niv_certeza_legal"("id_nivel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_cat_estado_doc_fkey" FOREIGN KEY ("cat_estado_doc") REFERENCES "cat"."cat_estado_doc"("id_estado_doc") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_desarrollo" ADD CONSTRAINT "inv_desarrollo_id_origen_proyecto_fkey" FOREIGN KEY ("id_origen_proyecto") REFERENCES "cat"."cat_origen_proyecto"("id_origen_proyecto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_tipologia" ADD CONSTRAINT "inv_tipologia_id_desarrollo_fkey" FOREIGN KEY ("id_desarrollo") REFERENCES "inv"."inv_desarrollo"("id_desarrollo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_unidad" ADD CONSTRAINT "inv_unidad_id_desarrollo_fkey" FOREIGN KEY ("id_desarrollo") REFERENCES "inv"."inv_desarrollo"("id_desarrollo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_unidad" ADD CONSTRAINT "inv_unidad_id_tipologia_fkey" FOREIGN KEY ("id_tipologia") REFERENCES "inv"."inv_tipologia"("id_tipologia") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_unidad" ADD CONSTRAINT "inv_unidad_id_tipo_inmueble_fkey" FOREIGN KEY ("id_tipo_inmueble") REFERENCES "cat"."cat_tipo_inmueble"("id_tipo_inmueble") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_unidad" ADD CONSTRAINT "inv_unidad_id_estado_unidad_fkey" FOREIGN KEY ("id_estado_unidad") REFERENCES "cat"."cat_estado_unidad"("id_estado_unidad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_unidad" ADD CONSTRAINT "inv_unidad_id_tipo_propiedad_fkey" FOREIGN KEY ("id_tipo_propiedad") REFERENCES "cat"."cat_tipo_propiedad"("id_tipo_propiedad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_precio_historico" ADD CONSTRAINT "inv_precio_historico_id_unidad_fkey" FOREIGN KEY ("id_unidad") REFERENCES "inv"."inv_unidad"("id_unidad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_apartado" ADD CONSTRAINT "inv_apartado_id_unidad_fkey" FOREIGN KEY ("id_unidad") REFERENCES "inv"."inv_unidad"("id_unidad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_apartado" ADD CONSTRAINT "inv_apartado_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_venta" ADD CONSTRAINT "inv_venta_id_unidad_fkey" FOREIGN KEY ("id_unidad") REFERENCES "inv"."inv_unidad"("id_unidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv"."inv_venta" ADD CONSTRAINT "inv_venta_id_lead_fkey" FOREIGN KEY ("id_lead") REFERENCES "crm"."crm_lead"("id_lead") ON DELETE SET NULL ON UPDATE CASCADE;
