import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export const mailgun = new Mailgun(FormData);

export const mg = mailgun.client({
  username: process.env.MAILGUN_PUBLIC_API_KEY,
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net',
});
