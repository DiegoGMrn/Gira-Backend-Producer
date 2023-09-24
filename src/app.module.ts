import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './dtos/cat.dtos'
@Module({
  imports: [ClientsModule.register([
    {
      name: 'CATS_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'user_crud',
    password: 'root',
    database: 'db_crud',
    autoLoadEntities:true,
    synchronize: true,
  }),TypeOrmModule.forFeature([Cats]) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
