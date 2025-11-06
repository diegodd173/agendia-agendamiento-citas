import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

/**
 * Controlador para manejar las operaciones relacionadas con las reservas (Bookings).
 * Define los endpoints que permiten crear, consultar, actualizar y eliminar reservas.
 */
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  /**
   * Crea una nueva reserva en el sistema.
   * @param createBookingDto - Datos de la reserva a crear.
   */
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  /**
   * Obtiene todas las reservas registradas.
   */
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  /**
   * Obtiene todas las reservas asociadas a un barbero específico.
   * @param barberoId - ID del barbero.
   */
  @Get('barbero/:barberoId')
  findByBarbero(@Param('barberoId') barberoId: string) {
    return this.bookingsService.findByBarbero(barberoId);
  }

  /**
   * Obtiene una reserva específica por su ID.
   * @param id - ID de la reserva.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  /**
   * Actualiza una reserva existente por su ID.
   * @param id - ID de la reserva.
   * @param updateBookingDto - Datos actualizados de la reserva.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: any) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  /**
   * Elimina una reserva del sistema por su ID.
   * @param id - ID de la reserva a eliminar.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
