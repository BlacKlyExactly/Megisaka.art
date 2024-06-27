const sleep = (ms = 1000000) =>
  new Promise((res) => setTimeout(() => res(ms), ms));

export default sleep;
