import Text from '../typography/Text';
import { Language } from '@/utils/langPageProps';
import { fetchFooter } from '@/lib/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import {} from 'lucide-react';

const Footer = async ({ lang }: { lang?: Language }) => {
  const { copyright, madeby } = await fetchFooter();

  return (
    <footer className=" py-11 pb-40 px-page-mobile w-full border-t border-white border-opacity-[0.12] flex flex-col justify-center items-center lg:px-page lg:flex-row lg:justify-between gap-8 mt-28 lg:mt-36 lg:pb-11">
      <div className="space-y-4">
        <Text
          size="footer"
          className="!font-light opacity-70 text-center lg:text-left"
        >
          {getTranslatedText(copyright, lang)}
        </Text>
        <Text
          size="footer"
          className="text-crimson !font-bold text-center lg:text-left"
        >
          <a href="https://blacklyexactly.com">
            {getTranslatedText(madeby, lang)}
          </a>
        </Text>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {socials.map(({ Icon, href }) => (
          <a
            key={href}
            href={href}
            className="w-11 h-11 rounded-full border border-crimson flex items-center justify-center text-crimson"
          >
            {Icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

const socials = [
  {
    href: 'https://discord.gg/CkX97dt4Kj',
    Icon: (
      <svg
        className="pointer-events-none"
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: 'https://x.com/Megisaka',
    Icon: (
      <svg
        width="19px"
        height="17px"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.86927 0H1.07613L7.17674 7.06903L1.33514e-05 16.6897H5.61796L10.0213 10.8563L15.0537 16.6897H17.8508L11.3269 9.12716L18.2069 0H12.4465L8.47045 5.33186L3.86927 0ZM4.85044 14.9966H3.30352L13.2892 1.60477H14.9509L4.85044 14.9966Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/Megisakaa/',
    Icon: (
      <svg
        className="pointer-events-none"
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill="currentColor"
        />
        <path
          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.artstation.com/megisaka',
    Icon: (
      <svg
        className="mt-[-2px] pointer-events-none"
        fill="currentColor"
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z" />
      </svg>
    ),
  },
  {
    href: 'https://www.deviantart.com/megi-sensei',
    Icon: (
      <svg
        className="pointer-events-none"
        width="22px"
        height="22px"
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="12"
          d="M99 54H54v28h33m6 56h45v-28h-33"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M110.616 19.351A6.002 6.002 0 0 1 116 16h22a6 6 0 0 1 6 6v22c0 .918-.211 1.825-.616 2.649L109.258 116H95.884L132 42.604V28h-12.265l-15.746 32H90.615l20.001-40.649ZM88.011 132l-15.746 32H60v-14.604L96.116 76H82.742l-34.126 69.351A6 6 0 0 0 48 148v22a6 6 0 0 0 6 6h22a6 6 0 0 0 5.383-3.351L101.385 132H88.011Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.youtube.com/channel/UCs1s8QBvYmU7RNtkvlOQ9VA',
    Icon: (
      <svg
        className="pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="22px"
        height="22px"
      >
        <path
          d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@megisakaa',
    Icon: (
      <svg
        className="pointer-events-none"
        fill="currentColor"
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
      </svg>
    ),
  },
];

export default Footer;
