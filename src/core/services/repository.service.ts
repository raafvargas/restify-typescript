import { Repository } from '../model/repository.model';
import { RestClient } from 'typed-rest-client/RestClient';

export class RepositoryService {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient('restfy-api', 'https://api.github.com');
    }

    getRepositories(username: string): Promise<Array<Repository>> {
        return this.restClient.get<Array<Repository>>('/users/' + username + '/repos')
            .then(res => res.result);
    }
}
