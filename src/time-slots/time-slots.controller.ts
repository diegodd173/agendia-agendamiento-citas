import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';

/**
 * Controlador encargado de manejar las rutas relacionadas con los bloques de tiempo (TimeSlots).
 * 
 * Endpoint base: `/time-slots`
 */
@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  /**
   * Crea un nuevo bloque de tiempo.
   * 
   * @param createTimeSlotDto Datos del bloque de tiempo a crear.
   * @returns El bloque de tiempo creado.
   * 
   * @example
   * POST /time-slots
   * {
   *   "barbero_id": "652a3d9b9f8b2d0012c34a56",
   *   "fecha": "2025-11-06",
   *   "hora_inicio": "09:00",
   *   "hora_fin": "10:00"
   * }
   */
  @Post()
  create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotsService.create(createTimeSlotDto);
  }

  /**
   * Obtiene todos los bloques de tiempo disponibles.
   * 
   * @returns Lista de todos los bloques registrados.
   * 
   * @example
   * GET /time-slots
   */
  @Get()
  findAll() {
    return this.timeSlotsService.findAll();
  }

  /**
   * Obtiene todos los bloques de tiempo asociados a un barbero específico.
   * 
   * @param barberoId ID del barbero.
   * @returns Lista de bloques de tiempo del barbero indicado.
   * 
   * @example
   * GET /time-slots/barbero/652a3d9b9f8b2d0012c34a56
   */
  @Get('barbero/:barberoId')
  findByBarbero(@Param('barberoId') barberoId: string) {
    return this.timeSlotsService.findByBarbero(barberoId);
  }

  /**
   * Obtiene un bloque de tiempo específico por su ID.
   * 
   * @param id ID del bloque de tiempo.
   * @returns El bloque de tiempo encontrado.
   * 
   * @example
   * GET /time-slots/653b4e2f1a2b3c0012d45f67
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSlotsService.findOne(id);
  }

  /**
   * Actualiza la información de un bloque de tiempo existente.
   * 
   * @param id ID del bloque a actualizar.
   * @param updateTimeSlotDto Nuevos datos del bloque.
   * @returns El bloque actualizado.
   * 
   * @example
   * PATCH /time-slots/653b4e2f1a2b3c0012d45f67
   * {
   *   "hora_inicio": "10:00",
   *   "hora_fin": "11:00"
   * }
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSlotDto: CreateTimeSlotDto,
  ) {
    return this.timeSlotsService.update(id, updateTimeSlotDto);
  }

  /**
   * Elimina un bloque de tiempo por su ID.
   * 
   * @param id ID del bloque a eliminar.
   * @returns El bloque eliminado (o error si no existe).
   * 
   * @example
   * DELETE /time-slots/653b4e2f1a2b3c0012d45f67
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSlotsService.remove(id);
  }
}
