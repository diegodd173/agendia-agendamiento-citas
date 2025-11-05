import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  duracion_minutos!: number;

  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  @IsString()
  descripcion?: string;
}
