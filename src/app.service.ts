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
    //console.log(savedUser)
    return savedUser; // Devuelve el usuario guardado
  }
  
  
  
  
}
