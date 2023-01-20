import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from '../jobs/sendMail-producer-service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('user')
class UserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post('/')
  createUser(@Body() user: CreateUserDTO) {
    this.sendMailService.sendMail(user);
    return user;
  }
}

export { UserController };
