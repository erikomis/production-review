import { container } from 'tsyringe';
import { IMailProvider } from './IMail.Provider';
import { EtherealMailProvider } from './implementations/EtherealMail.Provider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  mailProvider.ethereal,
);
