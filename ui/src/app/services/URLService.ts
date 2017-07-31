import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class URLService {
    constructor (private http : Http) {

    }
    minify(url : string) : Promise<string | void> {
        return this.http.get(`/api/min/${url}`).toPromise().then(r => r.text() as string).catch(this.err);
    }
    deminify(url: string) : Promise<string | void> {
        return this.http.get(`/api/demin/${url}`).toPromise().then(r => r.text() as string).catch(this.err);
    }
    err(e: any) {
        
    }
}