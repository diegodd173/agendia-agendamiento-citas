import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type Model, Types } from 'mongoose';
import { TimeSlot, type TimeSlotDocument } from './schemas/time-slot.schema';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los bloques de tiempo (TimeSlots).
 *
 * Incluye operaciones CRUD y métodos adicionales
 * para bloquear o desbloquear bloques de tiempo según las citas.
 */
@Injectable()
export class TimeSlotsService {
  private timeSlotModel: Model<TimeSlotDocument>;

  constructor(
    @InjectModel(TimeSlot.name) timeSlotModel: Model<TimeSlotDocument>,
  ) {
    this.timeSlotModel = timeSlotModel;
  }

  /**
   * Crea un nuevo bloque de tiempo asociado a un barbero.
   *
   * @param createTimeSlotDto Datos del bloque de tiempo a crear.
   * @returns El bloque de tiempo creado.
   */
  async create(createTimeSlotDto: CreateTimeSlotDto) {
    const createdTimeSlot = new this.timeSlotModel({
      ...createTimeSlotDto,
      barbero_id: new Types.ObjectId(createTimeSlotDto.barbero_id),
    });
    return createdTimeSlot.save();
  }

  /**
   * Obtiene todos los bloques de tiempo registrados.
   *
   * @returns Lista de bloques de tiempo con información del barbero.
   */
  async findAll() {
    return this.timeSlotModel.find().populate('barbero_id').exec();
  }

  /**
   * Obtiene todos los bloques de tiempo asignados a un barbero específico.
   *
   * @param barberoId ID del barbero.
   * @returns Lista de bloques de tiempo pertenecientes al barbero.
   */
  async findByBarbero(barberoId: string) {
    return this.timeSlotModel
      .find({ barbero_id: new Types.ObjectId(barberoId) })
      .exec();
  }

  /**
   * Busca un bloque de tiempo por su ID.
   *
   * @param id ID del bloque de tiempo.
   * @returns El bloque de tiempo encontrado.
   * @throws NotFoundException Si no se encuentra el bloque.
   */
  async findOne(id: string) {
    const timeSlot = await this.timeSlotModel
      .findById(id)
      .populate('barbero_id')
      .exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    return timeSlot;
  }

  /**
   * Actualiza un bloque de tiempo existente.
   *
   * @param id ID del bloque a actualizar.
   * @param updateTimeSlotDto Nuevos datos para el bloque.
   * @returns El bloque de tiempo actualizado.
   * @throws NotFoundException Si el bloque no existe.
   */
  async update(id: string, updateTimeSlotDto: CreateTimeSlotDto) {
    const timeSlot = await this.timeSlotModel
      .findByIdAndUpdate(id, updateTimeSlotDto, {
        new: true,
      })
      .exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    return timeSlot;
  }

  /**
   * Elimina un bloque de tiempo por su ID.
   *
   * @param id ID del bloque a eliminar.
   * @returns El bloque eliminado.
   * @throws NotFoundException Si el bloque no existe.
   */
  async remove(id: string) {
    const timeSlot = await this.timeSlotModel.findByIdAndDelete(id).exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    return timeSlot;
  }

  /**
   * Bloquea un bloque de tiempo agregando una cita asociada.
   *
   * @param id ID del bloque a bloquear.
   * @param bookingId ID de la cita asociada.
   * @returns El bloque de tiempo actualizado y bloqueado.
   * @throws NotFoundException Si el bloque no existe.
   */
  async blockTimeSlot(id: string, bookingId: string) {
    const timeSlot = await this.timeSlotModel.findById(id).exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    timeSlot.citas_asociadas.push(new Types.ObjectId(bookingId));
    timeSlot.disponible = false;
    return timeSlot.save();
  }

  /**
   * Desbloquea un bloque de tiempo eliminando una cita asociada.
   *
   * Si el bloque queda sin citas, vuelve a marcarse como disponible.
   *
   * @param id ID del bloque a desbloquear.
   * @param bookingId ID de la cita que se elimina.
   * @returns El bloque de tiempo actualizado.
   * @throws NotFoundException Si el bloque no existe.
   */
  async unblockTimeSlot(id: string, bookingId: string) {
    const timeSlot = await this.timeSlotModel.findById(id).exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    timeSlot.citas_asociadas = timeSlot.citas_asociadas.filter(
      (cita) => cita.toString() !== bookingId,
    );
    if (timeSlot.citas_asociadas.length === 0) {
      timeSlot.disponible = true;
    }
    return timeSlot.save();
  }
}
