import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

/**
 * Controlador encargado de gestionar los endpoints relacionados con los servicios.
 * 
 * Prefijo base de ruta: `/services`
 */
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * Crea un nuevo servicio.
   * 
   * **POST** `/services`
   * 
   * @param createServiceDto - Datos necesarios para crear el servicio.
   * @returns El servicio creado.
   */
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  /**
   * Obtiene todos los servicios disponibles.
   * 
   * **GET** `/services`
   * 
   * @returns Lista de servicios registrados.
   */
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  /**
   * Obtiene un servicio por su ID.
   * 
   * **GET** `/services/:id`
   * 
   * @param id - Identificador único del servicio.
   * @returns Detalle del servicio encontrado.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  /**
   * Actualiza la información de un servicio existente.
   * 
   * **PATCH** `/services/:id`
   * 
   * @param id - ID del servicio a actualizar.
   * @param updateServiceDto - Nuevos datos del servicio.
   * @returns El servicio actualizado.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: CreateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  /**
   * Elimina un servicio por su ID.
   * 
   * **DELETE** `/services/:id`
   * 
   * @param id - Identificador del servicio a eliminar.
   * @returns El servicio eliminado.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
