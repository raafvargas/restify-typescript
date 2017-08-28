import * as restify from 'restify';
import { RequestHandler } from 'restify';
import { IController } from '../base/controller.interface';
import { RepositoryService } from '../../core/services/repository.service';

export class RepositoriesController implements IController {
    private service: RepositoryService;

    constructor() {
        this.service = new RepositoryService();
    }

    public register(server: restify.Server): void {
        server.get('/repositories/:username', async (req, res, next) => {
            this.service.getRepositories(req.params['username'])
                .then((reps) => {
                    if (reps) {
                        res.send(200, reps);
                    } else {
                        res.send(404);
                    }
                    next();
                })
        });
    }
}
