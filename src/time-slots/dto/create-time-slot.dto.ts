import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTimeSlotDto {
  @IsMongoId()
  @IsNotEmpty()
  barbero_id!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  hora_inicio!: string;

  @IsString()
  @IsNotEmpty()
  hora_fin!: string;
}
