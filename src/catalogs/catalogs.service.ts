import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBaseCatalogDto, UpdateBaseCatalogDto, CreateServicioDto, UpdateServicioDto, CreateTipoPropiedadDto, UpdateTipoPropiedadDto, CreateCiudadDto, UpdateCiudadDto } from './dto/catalog.dto';

@Injectable()
export class CatalogsService {
    constructor(private readonly prisma: PrismaService) { }

    // ---- Servicios ----
    async getServicios() {
        return this.prisma.catServicios.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createServicio(data: CreateServicioDto) {
        return this.prisma.catServicios.create({ data });
    }

    async updateServicio(id: number, data: UpdateServicioDto) {
        return this.prisma.catServicios.update({ where: { id_servicio: id }, data });
    }

    async deleteServicio(id: number) {
        return this.prisma.catServicios.delete({ where: { id_servicio: id } });
    }

    // ---- MetodosPago ----
    async getMetodosPago() {
        return this.prisma.catMetodoPago.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createMetodoPago(data: CreateBaseCatalogDto) {
        return this.prisma.catMetodoPago.create({ data });
    }

    async updateMetodoPago(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catMetodoPago.update({ where: { id_metodo_pago: id }, data });
    }

    async deleteMetodoPago(id: number) {
        return this.prisma.catMetodoPago.delete({ where: { id_metodo_pago: id } });
    }

    // ---- TiposInmueble ----
    async getTiposInmueble() {
        return this.prisma.catTipoInmueble.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createTipoInmueble(data: CreateBaseCatalogDto) {
        return this.prisma.catTipoInmueble.create({ data });
    }

    async updateTipoInmueble(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catTipoInmueble.update({ where: { id_tipo_inmueble: id }, data });
    }

    async deleteTipoInmueble(id: number) {
        return this.prisma.catTipoInmueble.delete({ where: { id_tipo_inmueble: id } });
    }

    // ---- TiposProyecto ----
    async getTiposProyecto() {
        return this.prisma.catTipoProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createTipoProyecto(data: CreateBaseCatalogDto) {
        return this.prisma.catTipoProyecto.create({ data });
    }

    async updateTipoProyecto(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catTipoProyecto.update({ where: { id_tipo_proyecto: id }, data });
    }

    async deleteTipoProyecto(id: number) {
        return this.prisma.catTipoProyecto.delete({ where: { id_tipo_proyecto: id } });
    }

    // ---- SubtiposHabitacional ----
    async getSubtiposHabitacional() {
        return this.prisma.catSubtipoHabitacional.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createSubtipoHabitacional(data: CreateBaseCatalogDto) {
        return this.prisma.catSubtipoHabitacional.create({ data });
    }

    async updateSubtipoHabitacional(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catSubtipoHabitacional.update({ where: { id_subtipo: id }, data });
    }

    async deleteSubtipoHabitacional(id: number) {
        return this.prisma.catSubtipoHabitacional.delete({ where: { id_subtipo: id } });
    }

    // ---- OrigenesProyecto ----
    async getOrigenesProyecto() {
        return this.prisma.catOrigenProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createOrigenProyecto(data: CreateBaseCatalogDto) {
        return this.prisma.catOrigenProyecto.create({ data });
    }

    async updateOrigenProyecto(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catOrigenProyecto.update({ where: { id_origen_proyecto: id }, data });
    }

    async deleteOrigenProyecto(id: number) {
        return this.prisma.catOrigenProyecto.delete({ where: { id_origen_proyecto: id } });
    }

    // ---- EstadosUnidad ----
    async getEstadosUnidad() {
        return this.prisma.catEstadoUnidad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createEstadoUnidad(data: CreateBaseCatalogDto) {
        return this.prisma.catEstadoUnidad.create({ data });
    }

    async updateEstadoUnidad(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catEstadoUnidad.update({ where: { id_estado_unidad: id }, data });
    }

    async deleteEstadoUnidad(id: number) {
        return this.prisma.catEstadoUnidad.delete({ where: { id_estado_unidad: id } });
    }

    // ---- EstadosRelacionDesarrollador ----
    async getEstadosRelacionDesarrollador() {
        return this.prisma.catEstadoRelacionDesarrollador.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createEstadoRelacionDesarrollador(data: CreateBaseCatalogDto) {
        return this.prisma.catEstadoRelacionDesarrollador.create({ data });
    }

    async updateEstadoRelacionDesarrollador(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catEstadoRelacionDesarrollador.update({ where: { id_estado: id }, data });
    }

    async deleteEstadoRelacionDesarrollador(id: number) {
        return this.prisma.catEstadoRelacionDesarrollador.delete({ where: { id_estado: id } });
    }

    // ---- NivelesCertezaLegal ----
    async getNivelesCertezaLegal() {
        return this.prisma.catNivelCertezaLegal.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createNivelCertezaLegal(data: CreateBaseCatalogDto) {
        return this.prisma.catNivelCertezaLegal.create({ data });
    }

    async updateNivelCertezaLegal(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catNivelCertezaLegal.update({ where: { id_nivel: id }, data });
    }

    async deleteNivelCertezaLegal(id: number) {
        return this.prisma.catNivelCertezaLegal.delete({ where: { id_nivel: id } });
    }

    // ---- EstadosDocumentacion ----
    async getEstadosDocumentacion() {
        return this.prisma.catEstadoDocumentacion.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async createEstadoDocumentacion(data: CreateBaseCatalogDto) {
        return this.prisma.catEstadoDocumentacion.create({ data });
    }

    async updateEstadoDocumentacion(id: number, data: UpdateBaseCatalogDto) {
        return this.prisma.catEstadoDocumentacion.update({ where: { id_estado_doc: id }, data });
    }

    async deleteEstadoDocumentacion(id: number) {
        return this.prisma.catEstadoDocumentacion.delete({ where: { id_estado_doc: id } });
    }

    // ---- TiposPropiedad ----
    async getTiposPropiedad() {
        return this.prisma.catTipoPropiedad.findMany({
            orderBy: { descripcion: 'asc' },
        });
    }

    async createTipoPropiedad(data: CreateTipoPropiedadDto) {
        return this.prisma.catTipoPropiedad.create({ data });
    }

    async updateTipoPropiedad(id: number, data: UpdateTipoPropiedadDto) {
        return this.prisma.catTipoPropiedad.update({ where: { id_tipo_propiedad: id }, data });
    }

    async deleteTipoPropiedad(id: number) {
        return this.prisma.catTipoPropiedad.delete({ where: { id_tipo_propiedad: id } });
    }

    // // ---- Ciudades ----
    // async getCiudades() {
    //     return this.prisma.invCiudad.findMany({
    //         orderBy: { nombre: 'asc' },
    //     });
    // }

    // async createCiudad(data: CreateCiudadDto) {
    //     return this.prisma.invCiudad.create({ data });
    // }

    // async updateCiudad(id: number, data: UpdateCiudadDto) {
    //     return this.prisma.invCiudad.update({ where: { id_inv_ciudad: id }, data });
    // }

    // async deleteCiudad(id: number) {
    //     return this.prisma.invCiudad.delete({ where: { id_inv_ciudad: id } });
    // }
}
