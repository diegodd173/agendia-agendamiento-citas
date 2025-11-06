import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los servicios ofrecidos.
 *
 * Contiene los métodos CRUD (crear, leer, actualizar, eliminar)
 * que interactúan con la base de datos MongoDB usando Mongoose.
 */
@Injectable()
export class ServicesService {
  constructor(
    /**
     * Inyección del modelo de Mongoose correspondiente a la entidad `Service`.
     * Permite realizar operaciones sobre la colección `services`.
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  /**
   * Crea un nuevo servicio en la base de datos.
   * @param createServiceDto - Datos del servicio a crear.
   * @returns El servicio creado como documento de Mongoose.
   */
  async create(createServiceDto: CreateServiceDto): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const createdService = await this.serviceModel.create(createServiceDto);
    return createdService;
  }

  /**
   * Obtiene todos los servicios disponibles.
   * @returns Una lista de servicios en formato plano (`lean()`).
   */
  async findAll(): Promise<Service[]> {
    const services = (await this.serviceModel
      .find()
      .lean()
      .exec()) as Service[];
    return services;
  }

  /**
   * Busca un servicio por su ID.
   * @param id - ID del servicio a buscar.
   * @throws NotFoundException si no se encuentra el servicio.
   * @returns El servicio encontrado.
   */
  async findOne(id: string): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  /**
   * Actualiza los datos de un servicio existente.
   * @param id - ID del servicio a actualizar.
   * @param updateServiceDto - Datos nuevos para el servicio.
   * @throws NotFoundException si no se encuentra el servicio.
   * @returns El servicio actualizado.
   */
  async update(
    id: string,
    updateServiceDto: CreateServiceDto,
  ): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  /**
   * Elimina un servicio de la base de datos.
   * @param id - ID del servicio a eliminar.
   * @throws NotFoundException si no se encuentra el servicio.
   * @returns El servicio eliminado.
   */
  async remove(id: string): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = await this.serviceModel.findByIdAndDelete(id).exec();

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }
}
