import { Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Post()
  create(createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotsService.create(createTimeSlotDto);
  }

  @Get()
  findAll() {
    return this.timeSlotsService.findAll();
  }

  @Get('barbero/:barberoId')
  findByBarbero(@Param('barberoId') barberoId: string) {
    return this.timeSlotsService.findByBarbero(barberoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSlotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, updateTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotsService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSlotsService.remove(id);
  }
}
