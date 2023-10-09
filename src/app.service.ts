import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Users } from './dtos/user.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy,
  @InjectRepository(Users) private readonly userRepository: Repository<Users>,private readonly jwtService: JwtService,){}
  
  
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user); // Espera a que se complete
    console.log(savedUser)
    return savedUser; // Devuelve el usuario guardado
  }
  
  async findUser(correo: string, clave: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    const user1 = !!user;
    console.log("asd",user1);
    return user1;
  }




  ///////////////////////////////////////// TEST JWT ////////////////////////////////////////////


  async findUserTest(correo: string, clave: string): Promise<Users | null> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    return user || null;
  }

  generateAccessToken(user: Partial<Users>): string {
    // Aquí debes implementar la lógica para generar el token JWT
    // Puedes utilizar el JwtService para generar el token con la información necesaria
    const payload = { correo: user.correo, /* otros datos que desees incluir */ };
    const accessToken = this.jwtService.sign(payload);
    return accessToken; // Devuelve solo la cadena del token JWT, no otros valores
  }





  
  
}
