import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class URLService {
    constructor (private http : Http) {

    }
    minify(url : string) : Promise<string> {
        return this.http.post('/api/min', {url}).toPromise().then(r => r.json().data as string).catch(this.err);
    }
    deminify(url: string) : Promise<string> {
        return this.http.post('/api/demin', {url}).toPromise().then(r => r.json().data as string).catch(this.err);
    }
    err(e: any) {
        
    }
}