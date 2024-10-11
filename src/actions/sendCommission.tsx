'use server';

import { SanityImageAssetDocument } from 'next-sanity';

import { actionClient } from '@/lib/safe-action';
import { client } from '@/lib/sanity/client';
import { sendCommissionSchemaFd } from '@/schemas/sendCommissionSchema';
import ratelimit from '@/utils/ratelimit';
import { resend } from '@/lib/resend';
import CommissionArtistMail from '@/components/emails/CommissionArtistMail';
import CommissionClientMail from '@/components/emails/CommissionClientMail';

export const sendCommission = actionClient
  .schema(sendCommissionSchemaFd)
  .action(
    async ({
      parsedInput: { name, email, artType, files, description, dc30ea9 },
    }) => {
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
      if (dc30ea9) {
        console.error('Honeypot filled!');

        return {
          error: {
            pl: 'Wykryto bota',
            en: 'Bot detected',
          },
        };
      }

      if (!name || !email || !artType || !description)
        return {
          error: {
            pl: 'Wymagane pola nie są wypełnione',
            en: "Required fields aren't filled",
          },
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
          resend.emails.send({
            from: 'Megisaka <noreply@megisaka.art>',
            to: email,
            subject: 'Commission confirmaiion',
            react: (
              <CommissionClientMail
                baseUrl="https://megisaka.art"
                name={name}
              />
            ),
          }),
          resend.emails.send({
            from: 'Megisaka <noreply@megisaka.art>',
            to: process.env.ARTIST_MAIL,
            subject: `Nowe zlecenie od ${name}`,
            react: (
              <CommissionArtistMail
                baseUrl="https://megisaka.art"
                name={name}
                email={email}
                artType={artType}
                description={description}
                assets={assets}
              />
            ),
          }),
        ];

        await Promise.all(messages);

        return {
          success: {
            pl: 'Pomyślnie wysłano prośbę o rysunek',
            en: 'Successfully sent commission request',
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
    },
  );
