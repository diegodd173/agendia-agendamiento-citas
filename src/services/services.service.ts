import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const createdService = await this.serviceModel.create(createServiceDto);
    return createdService;
  }

  async findAll(): Promise<Service[]> {
    const services = (await this.serviceModel
      .find()
      .lean()
      .exec()) as Service[];
    return services;
  }

  async findOne(id: string): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

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

  async remove(id: string): Promise<ServiceDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const service = await this.serviceModel.findByIdAndDelete(id).exec();

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }
}
