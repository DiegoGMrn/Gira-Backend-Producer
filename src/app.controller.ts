import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './dtos/user.dtos';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
    
    @EventPattern('new_user_created')
    async handleNewUserCreated(newUser: Partial<Users>) {
      if (newUser.name && newUser.clave && newUser.correo) {
        const createUserDto: CreateUserDto = {
          name: newUser.name,
          clave: newUser.clave,
          correo: newUser.correo,
        };
        await this.appService.create(createUserDto);
      } else {
        console.error('Falta INFO.');
      }
    }
  
    @EventPattern('login_user')
    async handleLoginUser(newUser: Partial<Users>) {
      if (newUser.correo && newUser.clave) {
        const { correo, clave } = newUser;
        const userExists = await this.appService.findUser(correo, clave);
        console.log(userExists)
        
      } 
    }
    
  
}

