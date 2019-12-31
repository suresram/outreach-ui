import {Injectable} from '@angular/core';
import { mockEvents } from './event.mock';
import { Event } from '../events.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {async as _async} from "rxjs/scheduler/async";

@Injectable()
export class EventsMockService {

 getEvents(status:string) : Observable<Event[]>{
   return of( mockEvents, _async );
 }

 register(eventId:string) : Observable<string>{
   return of( "success", _async );
 }

 create(event:Event) : Observable<Event>{
   return of(mockEvents[0], _async );
 }

}