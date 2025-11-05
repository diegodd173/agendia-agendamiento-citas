import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  @IsNotEmpty()
  cliente_id!: string;

  @IsMongoId()
  @IsNotEmpty()
  barbero_id!: string;

  @IsMongoId()
  @IsNotEmpty()
  servicio_id!: string;

  @IsString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  hora_inicio!: string;

  @IsString()
  @IsNotEmpty()
  hora_fin!: string;

  @IsMongoId()
  @IsNotEmpty()
  time_slot_id!: string;

  @IsString()
  observaciones?: string;
}
