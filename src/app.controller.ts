import { Body,Controller, Get ,Post} from '@nestjs/common';
import { AppService } from './app.service';
import { Cats } from './dtos/cat.dtos';
import { CreateCatDto } from './dtos/create-cat-dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get('/findcats')
  findAll() {
    return this.appService.findAll();
  }
  /*
  @Get('/catshello')
  getHello(): string {
    return this.appService.getHello();
  }*/
  @Post('/cats')
  async sendCatData(@Body() body: Cats) {
    return this.appService.getCatName(body.name);
  }
  
  @Post('/allcats')
  async allData(@Body() cat: Cats){
    
    return this.appService.getAll(cat);
  }
  @Post('/createcats')
  create(@Body() createCatDto: CreateCatDto){
    return this.appService.create(createCatDto);
  }
}
