import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from '../user/dtos/create-user.dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;
    console.log(data);
    await this.mailService.sendMail({
      to: data.email,
      from: 'JAPBASTOS <contato@japbastos.com>',
      subject: 'BACKGROUND JOBS',
      text: `Olá ${data.name} deu certo seu cadastro!`,
    });
  }

  @OnQueueCompleted()
  OnCompleted(job: Job) {
    console.log(`On competed ${job.name}`);
  }

  @OnQueueActive()
  OnActivated(job: Job) {
    console.log(`On started ${job.name}`);
  }
}
export { SendMailConsumer };
