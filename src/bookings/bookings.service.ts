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

@Injectable()
export class BookingsService {
  constructor(
    // 🚀 SOLUCIÓN 1: Usar @InjectModel para la primera dependencia (índice [0])
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
    private timeSlotsService: TimeSlotsService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const timeSlot = await this.timeSlotsService.findOne(
      createBookingDto.time_slot_id,
    );

    if (!timeSlot.disponible) {
      throw new BadRequestException('No hay horario disponible');
    }

    const createdBooking = new this.bookingModel({
      ...createBookingDto,
      cliente_id: new Types.ObjectId(createBookingDto.cliente_id),
      barbero_id: new Types.ObjectId(createBookingDto.barbero_id),
      servicio_id: new Types.ObjectId(createBookingDto.servicio_id),
      time_slot_id: new Types.ObjectId(createBookingDto.time_slot_id),
    });

    const booking = await createdBooking.save();

    await this.timeSlotsService.blockTimeSlot(
      createBookingDto.time_slot_id,
      (booking._id as Types.ObjectId).toString(),
    );

    return booking;
  }

  async findAll() {
    return this.bookingModel
      .find()
      .populate('cliente_id')
      .populate('barbero_id')
      .populate('servicio_id')
      .populate('time_slot_id')
      .exec();
  }

  async findByBarbero(barberoId: string) {
    return this.bookingModel
      .find({ barbero_id: new Types.ObjectId(barberoId) })
      .populate('cliente_id')
      .populate('servicio_id')
      .exec();
  }

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

  async update(id: string, updateBookingDto: CreateBookingDto) {
    const booking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, {
        new: true,
      })
      .exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async remove(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    await this.timeSlotsService.unblockTimeSlot(
      booking.time_slot_id.toString(),
      id,
    );

    return booking;
  }
}
