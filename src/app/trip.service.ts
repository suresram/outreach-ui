import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
export class Trip {
  constructor(
    public tripId: number,
    public fromLocation: string,
    public toLocation: string,
    public startTime: string,
    public endTime: string,
    public status:string
    ) { }
} 

@Injectable()
export class TripService {
  constructor(private _http: Http){}
 
  getTrips() : Observable<Trip[]>{
    var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.get(environment.apiUrl+"/trip-query/v1/summary", options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => throwError(error));
  }

}