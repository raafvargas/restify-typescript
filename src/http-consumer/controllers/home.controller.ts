import * as restify from 'restify';
import { RequestHandler } from 'restify';
import { IController } from '../base/controller.interface';

export class HomeController implements IController {
    public register(server: restify.Server): void {
        server.get('/', async (req, res, next) => {
            res.send(200);
            next();
        });
    }
}
