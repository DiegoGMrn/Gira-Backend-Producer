import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Cats } from './dtos/cat.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dtos/create-cat-dto';
@Injectable()
export class AppService {
  constructor(@Inject('CATS_SERVICE') private client: ClientProxy,
  @InjectRepository(Cats) private readonly catRepository: Repository<Cats>){}
  /*
  getHello(): string {
    return 'Hello World!';
  }*/
  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto)
    //this.catRepository.save(cat)
    return await this.catRepository.save(cat);
    //return this.client.send({ cmd: 'createcats'}, 'AGREGADO');
  }
  
  async getCatName(name: string){
    return this.client.send({ cmd: 'cats' }, name);
  }
  async getAll(cat: Cats){
    return this.client.send({ cmd: 'allcats'}, cat);
  } 

  async findAll() {
    return await this.catRepository.find();
  }
  
  
  
}
