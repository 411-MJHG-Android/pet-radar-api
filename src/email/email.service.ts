import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private emails: string[] = ['majirriz20@gmail.com'];
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_USER,
        pass: envs.MAILER_TOKEN,
      },
    });
  }

  async sendEmail(template: string) {
    await this.transporter.sendMail({
      to: 'majirriz20@gmail.com',
      subject: 'mascota Perdida',
      //text: 'Hola envio un correo',
      html:template, 
    });
  }
}