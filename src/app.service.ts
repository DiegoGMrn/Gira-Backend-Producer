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
  /*
  async findUser(correo: string, clave: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    const user1 = !!user;
    console.log("asd",user1);
    return user1;
  }*/

   ///////////////////////////////////////// TEST UPDATE ////////////////////////////////////////////
   async updatePassword(correo: string, claveAntigua: string, nuevaClave: string,): Promise<boolean> {
    
    const usuario = await this.userRepository.findOne({ where: { correo } });
    

    if(usuario && usuario.clave == claveAntigua){
      usuario.clave = nuevaClave;
      await this.userRepository.save(usuario);
      
      return true;
    }
    

    return false;
  }
    ///////////////////////////////////////// TEST UPDATE ////////////////////////////////////////////


  ///////////////////////////////////////// TEST JWT ////////////////////////////////////////////


  async findUserTest(correo: string, clave: string): Promise<Users | null> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    return user || null;
  }

  generateAccessToken(user: Partial<Users>): string {
    const expiresIn = 3600;
    const payload = { correo: user.correo, };
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return accessToken;
  }
   ///////////////////////////////////////// TEST JWT ////////////////////////////////////////////




  
  
}
