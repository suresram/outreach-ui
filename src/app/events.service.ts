import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
export class Event {
  constructor(
    public id:string,
    public name: string,
    public description: string,
    public fromDateTime: string,
    public toDateTime: string,
    public pointOfContact: string,
    public status:string,
    public location:string,
    public eventLocation:EventLocation
    ) { }
} 

export class EventLocation {
  constructor(
    public address1: string,
    ) { }
} 

@Injectable()
export class EventsService {
  constructor(private _http: Http){}
 
  getEvents(status:string) : Observable<Event[]>{
    var headers = new Headers({'Content-type': 'application/json', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.get(environment.apiUrl+"/events/v1/"+status, options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => throwError(error));
  }

  register(eventId:string) : Observable<string>{
    var headers = new Headers({'Content-type': 'text/plain', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.post(environment.apiUrl+"/registration/v1/"+eventId,"", options)
                   .map((res:Response) => res.text())
                   .catch((error:any) => throwError(error));
  }

    create(event:Event) : Observable<Event>{
    var headers = new Headers({'Content-type': 'application/json', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.post(environment.apiUrl+"/admin/v1",event, options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => throwError(error));
  }

}