import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Users } from './dtos/user.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
@Injectable()
export class AppService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy,
  @InjectRepository(Users) private readonly userRepository: Repository<Users>){}
  
  
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user); // Espera a que se complete
    return savedUser; // Devuelve el usuario guardado
  }
  
  async findUser(correo: string, clave: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    const user1 = !!user;
    console.log(user1);
    return user1;
  }
  
  
}
