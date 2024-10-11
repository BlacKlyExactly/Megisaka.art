'use server';

import MessageArtistMail from '@/components/emails/MessageArtistMail';
import MessageClientMail from '@/components/emails/MessageClientMail';
import { resend } from '@/lib/resend';
import { actionClient } from '@/lib/safe-action';
import { sendMessageSchemaFd } from '@/schemas/sendMessageSchema';
import ratelimit from '@/utils/ratelimit';

export const sendMessage = actionClient
  .schema(sendMessageSchemaFd)
  .action(async ({ parsedInput: { name, email, description, bkuXk05 } }) => {
    const { exceeded, limit, reset, remaining } = await ratelimit();

    if (exceeded) {
      console.error(`Exceeded ratelimit: ${limit}, ${remaining}, ${reset}`);

      return {
        error: {
          pl: 'Przekroczono limit zapytań. Spróbuj ponownie później',
          en: 'Rate limit exceeded. Try again later',
        },
      };
    }

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
      const messages = [
        resend.emails.send({
          from: 'Megisaka <noreply@megisaka.art>',
          to: email,
          subject: 'Message confirmation',
          react: (
            <MessageClientMail baseUrl="https://megisaka.art" name={name} />
          ),
        }),
        resend.emails.send({
          from: 'Megisaka <noreply@megisaka.art>',
          to: process.env.ARTIST_MAIL,
          subject: `Nowa wiadomość od ${name}`,
          react: (
            <MessageArtistMail
              baseUrl="https://megisaka.art"
              name={name}
              email={email}
              description={description}
            />
          ),
        }),
      ];

      await Promise.all(messages);

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
