import Text from './ui/typography/Text';

const Footer = () => (
  <footer className=" py-11 px-page-mobile w-full border-t border-white border-opacity-[0.12] flex flex-col justify-center items-center lg:px-page lg:flex-row lg:justify-between gap-8">
    <div className=" space-y-4">
      <Text
        size="footer"
        className="!font-light opacity-70 text-center lg:text-left"
      >
        © Megisaka - All rights reserved
      </Text>
      <Text
        size="footer"
        className="text-crimson !font-bold text-center lg:text-left"
      >
        <a href="https://blacklyexactly.com">Made by BlacKlyExactly</a>
      </Text>
    </div>
    <div className="flex gap-4">
      <a href="#">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8693 14H14.0761L20.1767 21.069L13 30.6897H18.618L23.0213 24.8563L28.0537 30.6897H30.8508L24.3269 23.1272L31.2069 14H25.4465L21.4705 19.3319L16.8693 14ZM17.8504 28.9966H16.3035L26.2892 15.6048H27.9509L17.8504 28.9966Z"
            fill="#F30637"
          />
          <circle cx="22" cy="22" r="21.5" stroke="#F30637" />
        </svg>
      </a>
      <a href="#">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8693 14H14.0761L20.1767 21.069L13 30.6897H18.618L23.0213 24.8563L28.0537 30.6897H30.8508L24.3269 23.1272L31.2069 14H25.4465L21.4705 19.3319L16.8693 14ZM17.8504 28.9966H16.3035L26.2892 15.6048H27.9509L17.8504 28.9966Z"
            fill="#F30637"
          />
          <circle cx="22" cy="22" r="21.5" stroke="#F30637" />
        </svg>
      </a>
      <a href="#">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8693 14H14.0761L20.1767 21.069L13 30.6897H18.618L23.0213 24.8563L28.0537 30.6897H30.8508L24.3269 23.1272L31.2069 14H25.4465L21.4705 19.3319L16.8693 14ZM17.8504 28.9966H16.3035L26.2892 15.6048H27.9509L17.8504 28.9966Z"
            fill="#F30637"
          />
          <circle cx="22" cy="22" r="21.5" stroke="#F30637" />
        </svg>
      </a>
    </div>
  </footer>
);

export default Footer;
