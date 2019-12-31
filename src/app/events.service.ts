import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders  } from  "@angular/common/http";
import { environment } from './../environments/environment';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
export interface Event {
    id:string;
    name: string;
    description: string;
    fromDateTime: string;
    toDateTime: string;
    pointOfContact: string;
    status:string;
    location:string;
    eventLocation:EventLocation;
    
} 

export interface EventLocation {
    address1: string;
} 

@Injectable()
export class EventsService {
  constructor(private _http: HttpClient ){}
 
  getEvents(status:string) : Observable<Event[]>{
    var headers = new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = { headers: headers };
    return this._http.get<Event[]>(environment.apiUrl+"/events/v1/"+status, options)
                   .catch((error:any) => throwError(error));
  }

  register(eventId:string) : Observable<string>{
    var headers = new HttpHeaders ({'Content-type': 'text/plain', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = { headers: headers, responseType: 'text' as 'json' };
    return this._http.post<string>(environment.apiUrl+"/registration/v1/"+eventId,null, options)
                   .catch((error:any) => throwError(error));
  }

    create(event:Event) : Observable<Event>{
    var headers = new HttpHeaders ({'Content-type': 'application/json', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = { headers: headers };
    return this._http.post<Event>(environment.apiUrl+"/admin/v1",event, options)
                   .catch((error:any) => throwError(error));
  }

}