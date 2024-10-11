'use server';

import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { headers } from 'next/headers';

const rl = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '120s'),
});

const ratelimit = async () => {
  if (process.env.NODE_ENV === 'production') {
    const ip = headers().get('x-forwarded-for');
    const { limit, reset, remaining, success } = await rl.limit(ip!);

    return {
      success,
      exceeded: remaining === 0,
      limit,
      reset,
      remaining,
    };
  }

  return {
    success: true,
    exceeded: false,
    limit: 0,
    reset: 0,
    remaining: 5,
  };
};

export default ratelimit;
