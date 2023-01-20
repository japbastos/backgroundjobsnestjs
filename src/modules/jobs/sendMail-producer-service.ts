import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from '../user/dtos/create-user.dto';

@Injectable()
class SendMailProducerService {
  constructor(
    @InjectQueue('sendMail-queue')
    private mailQueue: Queue,
  ) {}

  async sendMail(user: CreateUserDTO) {
    await this.mailQueue.add('sendMail-job', user);
  }
}

export { SendMailProducerService };
