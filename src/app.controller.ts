import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("Hello World")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary:'default controller'})
  @ApiResponse({status: 200, type: String})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
