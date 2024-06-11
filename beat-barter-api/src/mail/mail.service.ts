import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailOptions } from './interfaces';
import { resolve } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTemplatedEmail({
    to,
    subject,
    message,
    link,
  }: IEmailOptions): Promise<void> {
    await this.mailerService
      .sendMail({
        to,
        subject,
        template: resolve('./src/mail/templates/template.hbs'),
        context: {
          message,
          link,
        },
      })
      .catch((error) => {
        console.error(`Sending email error: ${error}`);
      });
  }
}
