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
      
      if (newUser.name && newUser.clave) {
      
        const createUserDto: CreateUserDto = {
          name: newUser.name,
          clave: newUser.clave,
        };

    
        await this.appService.create(createUserDto);
    
      } else {
        console.error('Falta INFO.');
      }
    }
    
  
}

