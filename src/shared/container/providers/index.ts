import { container } from 'tsyringe';

import IStarageProvider from "./StoragedProvider/models/IStorageProvider";
import DiskStorageProvider from "./StoragedProvider/implementations/DiskStorageProvider";

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStarageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);


container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);

