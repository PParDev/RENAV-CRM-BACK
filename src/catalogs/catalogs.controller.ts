import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBaseCatalogDto, UpdateBaseCatalogDto, CreateServicioDto, UpdateServicioDto, CreateTipoPropiedadDto, UpdateTipoPropiedadDto, CreateCiudadDto, UpdateCiudadDto } from './dto/catalog.dto';

@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) { }

    // ---- Servicios ----
    @Get('servicios')
    getServicios() {
        return this.catalogsService.getServicios();
    }

    @Post('servicios')
    createServicio(@Body() data: CreateServicioDto) {
        return this.catalogsService.createServicio(data);
    }

    @Patch('servicios/:id')
    updateServicio(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateServicioDto) {
        return this.catalogsService.updateServicio(id, data);
    }

    @Delete('servicios/:id')
    deleteServicio(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteServicio(id);
    }

    // ---- MetodosPago ----
    @Get('metodos-pago')
    getMetodosPago() {
        return this.catalogsService.getMetodosPago();
    }

    @Post('metodos-pago')
    createMetodoPago(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createMetodoPago(data);
    }

    @Patch('metodos-pago/:id')
    updateMetodoPago(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateMetodoPago(id, data);
    }

    @Delete('metodos-pago/:id')
    deleteMetodoPago(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteMetodoPago(id);
    }

    // ---- TiposInmueble ----
    @Get('tipos-inmueble')
    getTiposInmueble() {
        return this.catalogsService.getTiposInmueble();
    }

    @Post('tipos-inmueble')
    createTipoInmueble(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createTipoInmueble(data);
    }

    @Patch('tipos-inmueble/:id')
    updateTipoInmueble(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateTipoInmueble(id, data);
    }

    @Delete('tipos-inmueble/:id')
    deleteTipoInmueble(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteTipoInmueble(id);
    }

    // ---- TiposProyecto ----
    @Get('tipos-proyecto')
    getTiposProyecto() {
        return this.catalogsService.getTiposProyecto();
    }

    @Post('tipos-proyecto')
    createTipoProyecto(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createTipoProyecto(data);
    }

    @Patch('tipos-proyecto/:id')
    updateTipoProyecto(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateTipoProyecto(id, data);
    }

    @Delete('tipos-proyecto/:id')
    deleteTipoProyecto(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteTipoProyecto(id);
    }

    // ---- SubtiposHabitacional ----
    @Get('subtipos-habitacional')
    getSubtiposHabitacional() {
        return this.catalogsService.getSubtiposHabitacional();
    }

    @Post('subtipos-habitacional')
    createSubtipoHabitacional(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createSubtipoHabitacional(data);
    }

    @Patch('subtipos-habitacional/:id')
    updateSubtipoHabitacional(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateSubtipoHabitacional(id, data);
    }

    @Delete('subtipos-habitacional/:id')
    deleteSubtipoHabitacional(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteSubtipoHabitacional(id);
    }

    // ---- OrigenesProyecto ----
    @Get('origenes-proyecto')
    getOrigenesProyecto() {
        return this.catalogsService.getOrigenesProyecto();
    }

    @Post('origenes-proyecto')
    createOrigenProyecto(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createOrigenProyecto(data);
    }

    @Patch('origenes-proyecto/:id')
    updateOrigenProyecto(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateOrigenProyecto(id, data);
    }

    @Delete('origenes-proyecto/:id')
    deleteOrigenProyecto(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteOrigenProyecto(id);
    }

    // ---- EstadosUnidad ----
    @Get('estados-unidad')
    getEstadosUnidad() {
        return this.catalogsService.getEstadosUnidad();
    }

    @Post('estados-unidad')
    createEstadoUnidad(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createEstadoUnidad(data);
    }

    @Patch('estados-unidad/:id')
    updateEstadoUnidad(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateEstadoUnidad(id, data);
    }

    @Delete('estados-unidad/:id')
    deleteEstadoUnidad(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteEstadoUnidad(id);
    }

    // ---- EstadosRelacionDesarrollador ----
    @Get('estados-relacion-desarrollador')
    getEstadosRelacionDesarrollador() {
        return this.catalogsService.getEstadosRelacionDesarrollador();
    }

    @Post('estados-relacion-desarrollador')
    createEstadoRelacionDesarrollador(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createEstadoRelacionDesarrollador(data);
    }

    @Patch('estados-relacion-desarrollador/:id')
    updateEstadoRelacionDesarrollador(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateEstadoRelacionDesarrollador(id, data);
    }

    @Delete('estados-relacion-desarrollador/:id')
    deleteEstadoRelacionDesarrollador(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteEstadoRelacionDesarrollador(id);
    }

    // ---- NivelesCertezaLegal ----
    @Get('niveles-certeza-legal')
    getNivelesCertezaLegal() {
        return this.catalogsService.getNivelesCertezaLegal();
    }

    @Post('niveles-certeza-legal')
    createNivelCertezaLegal(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createNivelCertezaLegal(data);
    }

    @Patch('niveles-certeza-legal/:id')
    updateNivelCertezaLegal(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateNivelCertezaLegal(id, data);
    }

    @Delete('niveles-certeza-legal/:id')
    deleteNivelCertezaLegal(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteNivelCertezaLegal(id);
    }

    // ---- EstadosDocumentacion ----
    @Get('estados-documentacion')
    getEstadosDocumentacion() {
        return this.catalogsService.getEstadosDocumentacion();
    }

    @Post('estados-documentacion')
    createEstadoDocumentacion(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createEstadoDocumentacion(data);
    }

    @Patch('estados-documentacion/:id')
    updateEstadoDocumentacion(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateEstadoDocumentacion(id, data);
    }

    @Delete('estados-documentacion/:id')
    deleteEstadoDocumentacion(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteEstadoDocumentacion(id);
    }

    // ---- TiposPropiedad ----
    @Get('tipos-propiedad')
    getTiposPropiedad() {
        return this.catalogsService.getTiposPropiedad();
    }

    @Post('tipos-propiedad')
    createTipoPropiedad(@Body() data: CreateTipoPropiedadDto) {
        return this.catalogsService.createTipoPropiedad(data);
    }

    @Patch('tipos-propiedad/:id')
    updateTipoPropiedad(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTipoPropiedadDto) {
        return this.catalogsService.updateTipoPropiedad(id, data);
    }

    @Delete('tipos-propiedad/:id')
    deleteTipoPropiedad(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteTipoPropiedad(id);
    }

    // ---- Zonas ----
    @Get('zonas')
    getZonas() {
        return this.catalogsService.getZonas();
    }

    @Post('zonas')
    createZona(@Body() data: CreateBaseCatalogDto) {
        return this.catalogsService.createZona(data);
    }

    @Patch('zonas/:id')
    updateZona(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateBaseCatalogDto) {
        return this.catalogsService.updateZona(id, data);
    }

    @Delete('zonas/:id')
    deleteZona(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.deleteZona(id);
    }

    // // ---- Ciudades ----
    // @Get('ciudades')
    // getCiudades() {
    //     return this.catalogsService.getCiudades();
    // }

    // @Post('ciudades')
    // createCiudad(@Body() data: CreateCiudadDto) {
    //     return this.catalogsService.createCiudad(data);
    // }

    // @Patch('ciudades/:id')
    // updateCiudad(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCiudadDto) {
    //     return this.catalogsService.updateCiudad(id, data);
    // }

    // @Delete('ciudades/:id')
    // deleteCiudad(@Param('id', ParseIntPipe) id: number) {
    //     return this.catalogsService.deleteCiudad(id);
    // }

}
