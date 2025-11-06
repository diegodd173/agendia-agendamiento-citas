import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Controlador que gestiona las rutas relacionadas con los usuarios.
 * 
 * Base path: `/users`
 * 
 * Se encarga de recibir las solicitudes HTTP y delegarlas al servicio `UsersService`
 * para manejar la lógica de negocio y la interacción con la base de datos.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Crea un nuevo usuario en el sistema.
   * 
   * Método: **POST**  
   * Ruta: `/users`
   * 
   * @param createUserDto Datos del usuario a crear (validados mediante DTO)
   * @returns El usuario creado
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Obtiene la lista completa de usuarios registrados.
   * 
   * Método: **GET**  
   * Ruta: `/users`
   * 
   * @returns Un arreglo con todos los usuarios
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Busca un usuario por su ID.
   * 
   * Método: **GET**  
   * Ruta: `/users/:id`
   * 
   * @param id Identificador único del usuario
   * @returns El usuario correspondiente al ID, si existe
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Actualiza los datos de un usuario existente.
   * 
   * Método: **PATCH**  
   * Ruta: `/users/:id`
   * 
   * @param id ID del usuario a actualizar
   * @param updateUserDto Datos a modificar (actualmente tipado como `any`)
   * @returns El usuario actualizado
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID.
   * 
   * Método: **DELETE**  
   * Ruta: `/users/:id`
   * 
   * @param id ID del usuario a eliminar
   * @returns Resultado de la operación de eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
