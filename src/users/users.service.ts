import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Servicio responsable de la lógica de negocio relacionada con los usuarios.
 * 
 * Gestiona las operaciones CRUD (crear, leer, actualizar, eliminar)
 * sobre la colección `users` en la base de datos MongoDB.
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Inyección del modelo Mongoose correspondiente al esquema `User`.
     * Permite realizar operaciones directas sobre la colección `users`.
     */
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   * 
   * @param createUserDto Datos validados del nuevo usuario.
   * @returns El documento del usuario recién creado.
   */
  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Obtiene todos los usuarios registrados.
   * 
   * @returns Un arreglo con todos los documentos de usuarios.
   */
  async findAll() {
    return this.userModel.find().exec();
  }

  /**
   * Busca un usuario por su ID.
   * 
   * @param id Identificador único del usuario.
   * @throws {NotFoundException} Si el usuario no existe.
   * @returns El documento del usuario correspondiente.
   */
  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Actualiza los datos de un usuario existente.
   * 
   * @param id ID del usuario a actualizar.
   * @param updateUserDto Datos a modificar.
   * @throws {NotFoundException} Si el usuario no existe.
   * @returns El documento del usuario actualizado.
   */
  async update(id: string, updateUserDto: CreateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Elimina un usuario de la base de datos.
   * 
   * @param id ID del usuario a eliminar.
   * @throws {NotFoundException} Si el usuario no existe.
   * @returns El documento del usuario eliminado.
   */
  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
