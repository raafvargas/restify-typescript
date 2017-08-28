import * as os from 'os';
import { ApiStartup } from './http-consumer/api-startup';
import { IStartup } from './infrastructure/initializable.interface';

const servers: IStartup[] = new Array<IStartup>();

servers.push(new ApiStartup());

const initAll = async (server: IStartup) => {
    console.log('%s Starting...', server.name);
    await server.Run();
    console.log('%s Started!', server.name);
};

servers.forEach(initAll);
