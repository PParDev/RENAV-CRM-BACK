
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CatalogsService {
    constructor(private readonly prisma: PrismaService) { }

    // Obtiene la lista de servicios ofrecidos (ej. Bienes Raíces, Arquitectura)
    async getServicios() {
        return this.prisma.catServicios.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Devuelve los métodos de pago registrados en el sistema
    async getMetodosPago() {
        return this.prisma.catMetodoPago.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Lista de tipos de inmuebles (ej. Casa, Departamento, Terreno)
    async getTiposInmueble() {
        return this.prisma.catTipoInmueble.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Tipos de proyecto que se pueden cotizar o solicitar
    async getTiposProyecto() {
        return this.prisma.catTipoProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Listado de divisiones para proyectos habitacionales (ej. Residencial, Interés Social)
    async getSubtiposHabitacional() {
        return this.prisma.catSubtipoHabitacional.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Orígenes desde donde puede provenir un desarrollo (Inversión propia, Asociación, etc)
    async getOrigenesProyecto() {
        return this.prisma.catOrigenProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Estados de venta o apartado posibles para una unidad específica
    async getEstadosUnidad() {
        return this.prisma.catEstadoUnidad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Nivel de la relación que se tiene con un desarrollador (Ej. Partner, Externo)
    async getEstadosRelacionDesarrollador() {
        return this.prisma.catEstadoRelacionDesarrollador.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Estatus legal en el que se encuentra un desarrollo
    async getNivelesCertezaLegal() {
        return this.prisma.catNivelCertezaLegal.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Avance de la documentación necesaria para vender un desarrollo
    async getEstadosDocumentacion() {
        return this.prisma.catEstadoDocumentacion.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Distintos usos y atributos de una propiedad para catálogo
    async getTiposPropiedad() {
        return this.prisma.catTipoPropiedad.findMany({
            orderBy: { descripcion: 'asc' },
        });
    }

    // Ciudades generales cargadas en el catálogo central
    async getCiudades() {
        return this.prisma.invCiudad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
}
