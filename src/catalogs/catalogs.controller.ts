
import { Controller, Get } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) { }

    @Get('servicios')
    getServicios() {
        return this.catalogsService.getServicios();
    }

    @Get('metodos-pago')
    getMetodosPago() {
        return this.catalogsService.getMetodosPago();
    }

    @Get('tipos-inmueble')
    getTiposInmueble() {
        return this.catalogsService.getTiposInmueble();
    }

    @Get('tipos-proyecto')
    getTiposProyecto() {
        return this.catalogsService.getTiposProyecto();
    }

    @Get('subtipos-habitacional')
    getSubtiposHabitacional() {
        return this.catalogsService.getSubtiposHabitacional();
    }

    @Get('origenes-proyecto')
    getOrigenesProyecto() {
        return this.catalogsService.getOrigenesProyecto();
    }

    @Get('estados-unidad')
    getEstadosUnidad() {
        return this.catalogsService.getEstadosUnidad();
    }

    @Get('estados-relacion-desarrollador')
    getEstadosRelacionDesarrollador() {
        return this.catalogsService.getEstadosRelacionDesarrollador();
    }

    @Get('niveles-certeza-legal')
    getNivelesCertezaLegal() {
        return this.catalogsService.getNivelesCertezaLegal();
    }

    @Get('estados-documentacion')
    getEstadosDocumentacion() {
        return this.catalogsService.getEstadosDocumentacion();
    }

    @Get('tipos-propiedad')
    getTiposPropiedad() {
        return this.catalogsService.getTiposPropiedad();
    }

    @Get('ciudades')
    getCiudades() {
        return this.catalogsService.getCiudades();
    }
}
