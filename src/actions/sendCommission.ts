'use server';

import { mg } from '@/lib/mailgun';
import { actionClient } from '@/lib/safe-action';
import { client } from '@/lib/sanity/client';
import { sendCommissionSchemaFd } from '@/schemas/sendCommissionSchema';
import { SanityImageAssetDocument } from 'next-sanity';

export const sendCommission = actionClient
  .schema(sendCommissionSchemaFd)
  .action(
    async ({ parsedInput: { name, email, artType, files, description } }) => {
      if (!name || !email || !artType || !description)
        return {
          error: 'Missing input values',
        };

      try {
        const document = await client.create({
          _type: 'commissions',
          name,
          email,
          artType,
          description,
        });

        const filesArr: File[] = files
          ? files instanceof Array
            ? [...files]
            : [files]
          : [];

        let assets: SanityImageAssetDocument[] = [];

        for (const file of filesArr) {
          const asset = await client.assets.upload('image', file, {
            filename: file.name,
          });

          assets = [...assets, asset];

          await client
            .patch(document._id)
            .setIfMissing({ attachments: [] })
            .insert('after', 'attachments[-1]', [
              {
                _type: 'attachment',
                asset: {
                  _type: 'reference',
                  _ref: asset._id,
                },
              },
            ])
            .commit({
              autoGenerateArrayKeys: true,
            });
        }

        const messages = [
          mg.messages.create(process.env.MAILGUN_MAIL, {
            from: `Megisaka <megisaka@${process.env.MAILGUN_MAIL}>`,
            to: [process.env.ARTIST_MAIL],
            subject: 'Nowe zlecenie',
            html: /*html*/ `
          <h1>Nowe zlecenie</h1>
          <br>
          <p>Nazwa: ${name}</p>
          <p>Email: ${email}</p>
          <p>Typ rysunku: ${artType}</p>
          <p>Description: ${description}</p><br>
          <p>Załączniki:</p>
          ${assets.map(
            (asset) =>
              /*html*/ `<img style="width: 50%" src="${asset.url}"><br/>`,
          )}
          `,
          }),
          mg.messages.create(process.env.MAILGUN_MAIL, {
            from: `Megisaka <megisaka@${process.env.MAILGUN_MAIL}>`,
            to: email,
            subject: 'Commission confirmaiion',
            html: /*html*/ `
          <h1>Commission confirmaiion</h1><br>
          <p>Hi!</p>
          <p>I have recieved your commission and I'm gonna contact with you soon :3</p>
          <p>If you have any questions, contact with me.</p>
          <p>Mail: <b>megisapolska@gmail.com</b></p>
          <p>Discord: <b>megisaka</b></p><br>
          <p>Greetings</p>
          <p>Megisaka</p>
          `,
          }),
        ];

        await Promise.all(messages);

        return {
          success: 'Successfully sent commission request',
        };
      } catch (error) {
        console.log(error);
        return {
          error: 'Something went wrong. Try again later',
        };
      }
    },
  );
