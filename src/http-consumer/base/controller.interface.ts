import * as restify from 'restify';
import { RequestHandler } from 'restify';

export interface IController {
    register(server: restify.Server): void;
}
