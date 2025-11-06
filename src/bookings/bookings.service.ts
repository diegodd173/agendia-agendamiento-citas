import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { type Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { TimeSlotsService } from '../time-slots/time-slots.service';

/**
 * Servicio encargado de manejar toda la lógica de negocio relacionada con las reservas (bookings).
 * Gestiona la creación, consulta, actualización y eliminación de reservas,
 * además de la comunicación con el servicio de TimeSlots para bloquear y liberar horarios.
 */
@Injectable()
export class BookingsService {
  constructor(
    /**
     * Modelo de Mongoose inyectado para interactuar con la colección "bookings" en la base de datos.
     */
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    /**
     * Servicio de TimeSlots, usado para bloquear o liberar horarios según las reservas.
     */
    private timeSlotsService: TimeSlotsService,
  ) {}

  /**
   * Crea una nueva reserva (booking) y bloquea el horario correspondiente.
   * @param createBookingDto - Datos de la reserva enviados por el cliente.
   * @returns La reserva creada en la base de datos.
   */
  async create(createBookingDto: CreateBookingDto) {
    // Busca el horario asociado a la reserva
    const timeSlot = await this.timeSlotsService.findOne(
      createBookingDto.time_slot_id,
    );

    // Si el horario no está disponible, lanza un error
    if (!timeSlot.disponible) {
      throw new BadRequestException('No hay horario disponible');
    }

    // Crea el documento de reserva con los IDs convertidos a ObjectId
    const createdBooking = new this.bookingModel({
      ...createBookingDto,
      cliente_id: new Types.ObjectId(createBookingDto.cliente_id),
      barbero_id: new Types.ObjectId(createBookingDto.barbero_id),
      servicio_id: new Types.ObjectId(createBookingDto.servicio_id),
      time_slot_id: new Types.ObjectId(createBookingDto.time_slot_id),
    });

    // Guarda la reserva en la base de datos
    const booking = await createdBooking.save();

    // Bloquea el horario para que no se vuelva a reservar
    await this.timeSlotsService.blockTimeSlot(
      createBookingDto.time_slot_id,
      (booking._id as Types.ObjectId).toString(),
    );

    return booking;
  }

  /**
   * Obtiene todas las reservas almacenadas en la base de datos.
   * Incluye las relaciones con cliente, barbero, servicio y horario.
   */
  async findAll() {
    return this.bookingModel
      .find()
      .populate('cliente_id')
      .populate('barbero_id')
      .populate('servicio_id')
      .populate('time_slot_id')
      .exec();
  }

  /**
   * Obtiene todas las reservas asociadas a un barbero específico.
   * @param barberoId - ID del barbero.
   * @returns Listado de reservas del barbero.
   */
  async findByBarbero(barberoId: string) {
    return this.bookingModel
      .find({ barbero_id: new Types.ObjectId(barberoId) })
      .populate('cliente_id')
      .populate('servicio_id')
      .exec();
  }

  /**
   * Busca una reserva específica por su ID.
   * @param id - ID de la reserva.
   * @returns Los datos de la reserva encontrada.
   * @throws NotFoundException si la reserva no existe.
   */
  async findOne(id: string) {
    const booking = await this.bookingModel
      .findById(id)
      .populate('cliente_id')
      .populate('barbero_id')
      .populate('servicio_id')
      .populate('time_slot_id')
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  /**
   * Actualiza los datos de una reserva existente.
   * @param id - ID de la reserva a actualizar.
   * @param updateBookingDto - Nuevos datos de la reserva.
   * @returns La reserva actualizada.
   * @throws NotFoundException si la reserva no existe.
   */
  async update(id: string, updateBookingDto: CreateBookingDto) {
    const booking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, {
        new: true, // Retorna el documento actualizado
      })
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  /**
   * Elimina una reserva por su ID y libera el horario asociado.
   * @param id - ID de la reserva a eliminar.
   * @returns La reserva eliminada.
   * @throws NotFoundException si la reserva no existe.
   */
  async remove(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id).exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Libera el horario que estaba bloqueado
    await this.timeSlotsService.unblockTimeSlot(
      booking.time_slot_id.toString(),
      id,
    );

    return booking;
  }
}
