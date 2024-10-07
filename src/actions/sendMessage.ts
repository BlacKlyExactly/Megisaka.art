'use server';

import { mg } from '@/lib/mailgun';
import { actionClient } from '@/lib/safe-action';
import { sendMessageSchemaFd } from '@/schemas/sendMessageSchema';
import ratelimit from '@/utils/ratelimit';

export const sendMessage = actionClient
  .schema(sendMessageSchemaFd)
  .action(async ({ parsedInput: { name, email, description, bkuXk05 } }) => {
    const { exceeded, limit, reset, remaining } = await ratelimit();

    /*  if (exceeded) {
      console.error(`Exceeded ratelimit: ${limit}, ${remaining}, ${reset}`);

      return {
        error: {
          pl: 'Przekroczono limit zapytań. Spróbuj ponownie później',
          en: 'Rate limit exceeded. Try again later',
        },
      };
    } */

    //Honeypot
    if (bkuXk05) {
      console.error('Honeypot filled!');

      return {
        error: {
          pl: 'Wykryto bota',
          en: 'Bot detected',
        },
      };
    }

    if (!name || !email || !description)
      return {
        error: {
          pl: 'Wymagane pola nie są wypełnione',
          en: "Required fields aren't filled",
        },
      };

    try {
      await mg.messages.create(process.env.MAILGUN_MAIL, {
        from: `Megisaka <contact@megisaka.art>`,
        to: [process.env.ARTIST_MAIL],
        subject: `Nowa wiadomość od ${name}`,
        html: /*html*/ `
          <h1>Nowa wiadomość</h1>
          <br>
          <p>Nazwa: ${name}</p>
          <p>Email: ${email}</p>
          <p>Opis: ${description}</p><br>
          `,
      });

      return {
        success: {
          pl: 'Pomyślnie wysłano wiadomosć',
          en: 'Message has been successfully sent',
        },
      };
    } catch (error) {
      console.log(error);

      return {
        error: {
          pl: 'Wystąpił błąd, spróbuj ponownie później',
          en: 'Something went wrong. Try again later',
        },
      };
    }
  });
