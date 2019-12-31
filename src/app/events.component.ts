import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import {Router} from '@angular/router';
import {EventsService, Event} from './events.service'

@Component({
  selector: 'events',
  providers: [EventsService],  
  template: `<div class="container  bg-white rounded shadow-sm mt-3">
    <div class="row ">
    <h4 class="col-sm-9 p-3">All Events</h4>
    <div class="col-sm-3 p-3">
     <button type="button" *ngIf="roles=='ADMIN'" class="btn btn-primary" (click)="onCreateEvent()">Create Event</button>
     </div>
    </div>
    <div *ngIf="errorText" class="alert alert-danger" role="alert">
 {{errorText}}
</div>
    <div class="card-columns">
        <div class="card mb-4 box-shadow" *ngFor="let event of events">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal text-primary">{{event.name}}</h4>
          </div>
          <div class="card-body">
            <p class="card-subtitle mb-2 text-muted">{{event.description}}</p>
            <div class="row">
              <div class="col-sm-4 pb-1">POC</div>
              <div class="col-sm-8 pb-1">{{event.pointOfContact}}</div>
              <div class="col-sm-4 pb-1">Location</div>
              <div class="col-sm-8 pb-1">{{event.eventLocation.address1}}</div>
               <div class="col-sm-4 pb-1">Date</div>
              <div class="col-sm-8 pb-1"><span>{{event.fromDateTime}}</span><span *ngIf="event.toDateTime"> to {{event.toDateTime}}</span></div>
            </div>
            <div class="card-footer text-muted" *ngIf="roles=='VOLUNTEER'">
     <button type="button" (click)="register(event.id)" class="btn btn-lg btn-block btn-outline-primary">Register</button>
  </div>
           
          </div>
        </div>
      </div>
</div>`
})





export class EventsComponent implements OnInit{

    @Output() createEvent = new EventEmitter<boolean>();
    public events:Event[]=[];
    public errorText:string;
    public roles:string;
    constructor(private _router: Router,private _service:EventsService) {}

    ngOnInit(){
     
      this.getEvents();
    }
    getEvents(){
            let eventStatus: string = "open";
      this.roles=Cookie.get('roles');
      if(this.roles=='ADMIN')
      {
        eventStatus='all';
      }
              this._service.getEvents(eventStatus)
         .subscribe(
                     data => this.events = data,
                     error =>  {
                     this.errorText=JSON.stringify(error.error);
                     console.log(error)
                     });
    }

    register(eventId:string){
         this._service.register(eventId)
         .subscribe(
                     data => alert(data),
                     error =>  {
                       alert(JSON.stringify(error.error))
                     });
    }

    onCreateEvent(){
      this.createEvent.emit(true);
    }
}
