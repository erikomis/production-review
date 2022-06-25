import { main } from './main';

main()
  .then(() => {
    console.log('aplicação inicializada');
  })
  .catch((e) => {
    console.error(e);
  });
