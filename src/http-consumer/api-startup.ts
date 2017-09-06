import * as restify from 'restify';
import * as fs from 'fs';
import { Env } from '../infrastructure/env';
import * as swagger from 'restify-swagger-jsdoc';
import { IController } from './base/controller.interface';
import { HomeController } from './controllers/home.controller';
import { IStartup } from '../infrastructure/initializable.interface';
import { RepositoriesController } from './controllers/repositories.controller';

export class ApiStartup implements IStartup {
    public name = 'restful-api';
    public restifyServer: restify.Server;

    async Run(): Promise<any> {
        this.restifyServer = restify.createServer();
        this.restifyServer.use(restify.plugins.acceptParser(this.restifyServer.acceptable));
        this.restifyServer.use(restify.plugins.authorizationParser());
        this.restifyServer.use(restify.plugins.dateParser());
        this.restifyServer.use(restify.plugins.queryParser());
        this.restifyServer.use(restify.plugins.jsonp());
        this.restifyServer.use(restify.plugins.gzipResponse());
        this.restifyServer.use(restify.plugins.bodyParser({ mapParams: true }));

        this.controllers().forEach(controller => {
            controller.register(this.restifyServer);
        });
        
        const text = fs.readFileSync(__dirname + '\\swagger.json').toString();
        const json = JSON.parse(text);

        swagger.createSwaggerPage({
            title: 'Example API Docs',
            version: '1.0.0',
            server: this.restifyServer,
            path: '/swagger',
            definitions: json.definitions,
            forceSecure: false
        });

        return new Promise((resolve, reject) => {
            this.restifyServer.listen(Env.port, () => {
                resolve();
            });
        });
    }

    private controllers(): Array<IController> {
        const controllers: Array<IController> = new Array<IController>();
        controllers.push(new HomeController());
        controllers.push(new RepositoriesController());
        return controllers;
    }
}
