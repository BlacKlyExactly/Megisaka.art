import * as dotenv from 'dotenv';
import chalk from 'chalk';
import sleep from './src/utils/sleep';
import { envSchema } from './src/schemas/envSchema';

(async () => {
  console.clear();
  console.log(chalk.cyan('   🕑 Veryfing env variables...'));

  await sleep(1000);

  dotenv.config();

  const env = envSchema.safeParse(process.env);

  if (!env.success) {
    console.log(chalk.red('Missing env variables'));
    console.log(env.error.issues);
    throw new Error();
  }

  console.log(chalk.green('   ✓ Envs are valid, starting web app build...'));
  console.log('\n');
})();
