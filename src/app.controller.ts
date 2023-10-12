import { Controller,Logger  } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './dtos/user.dtos';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
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
    ///////////////////////////////////////// TEST UPDATE ////////////////////////////////////////////
    @EventPattern('update_pass_user')
    async handleUpdatePassUser(data: { oldpass: string, newpass: string, correo: string }) {
      const { oldpass, newpass, correo } = data;
      
      if (oldpass && newpass && correo) {
        const resp = await this.appService.updatePassword(correo,oldpass,newpass)
        return resp;
      } else {
        console.error('Falta INFO.');
      }
    }







    ///////////////////////////////////////// TEST UPDATE ////////////////////////////////////////////
   

    ///////////////////////////////////////// TEST JWT ////////////////////////////////////////////

    @EventPattern('login_user1')
    async handleLoginUserTest(newUser: Partial<Users>) {
      if (newUser.correo && newUser.clave) {
        const { correo, clave } = newUser;
        const user = await this.appService.findUserTest(correo, clave);
        if (user) {
          // Si el usuario existe y las credenciales son válidas, genera un token JWT
          const token = this.appService.generateAccessToken(newUser);
          //console.log(token);
          return token;
        } else {
          //this.logger.error('Credenciales incorrectas');
          return null;
        }
      }
    }
    
  
}

