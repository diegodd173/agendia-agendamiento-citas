import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSlotsService } from './time-slots.service';
import { TimeSlotsController } from './time-slots.controller';
import { TimeSlot, TimeSlotSchema } from './schemas/time-slot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TimeSlot.name,
        schema: TimeSlotSchema,
      },
    ]),
  ],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
