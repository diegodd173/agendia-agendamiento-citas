import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type Model, Types } from 'mongoose';
import { TimeSlot, type TimeSlotDocument } from './schemas/time-slot.schema';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';

@Injectable()
export class TimeSlotsService {
  private timeSlotModel: Model<TimeSlotDocument>;

  constructor(
    @InjectModel(TimeSlot.name) timeSlotModel: Model<TimeSlotDocument>,
  ) {
    this.timeSlotModel = timeSlotModel;
  }

  async create(createTimeSlotDto: CreateTimeSlotDto) {
    const createdTimeSlot = new this.timeSlotModel({
      ...createTimeSlotDto,
      barbero_id: new Types.ObjectId(createTimeSlotDto.barbero_id),
    });
    return createdTimeSlot.save();
  }

  async findAll() {
    return this.timeSlotModel.find().populate('barbero_id').exec();
  }

  async findByBarbero(barberoId: string) {
    return this.timeSlotModel
      .find({ barbero_id: new Types.ObjectId(barberoId) })
      .exec();
  }

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

  async remove(id: string) {
    const timeSlot = await this.timeSlotModel.findByIdAndDelete(id).exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    return timeSlot;
  }

  async blockTimeSlot(id: string, bookingId: string) {
    const timeSlot = await this.timeSlotModel.findById(id).exec();
    if (!timeSlot) {
      throw new NotFoundException(`TimeSlot with ID ${id} not found`);
    }
    timeSlot.citas_asociadas.push(new Types.ObjectId(bookingId));
    timeSlot.disponible = false;
    return timeSlot.save();
  }

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
