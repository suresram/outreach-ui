import { Component, OnInit, Output,  EventEmitter  } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import {EventsService, Event} from './events.service'

@Component({
  selector: 'event-form',
  providers: [EventsService],  
   styles: ['.cross-validation-error input { border-left: 5px solid red;}'],
  template: `<div class="container  bg-white rounded shadow-sm mt-3">
    <div class="row ">
    <h4 class="col-sm-9 p-3">Create Event</h4>
    <div class="col-sm-3 p-3">
     <button type="button" class="btn btn-primary" (click)="onCancel()">Cancel</button>
     </div>
    </div>

<div *ngIf="errorText" class="alert alert-danger" role="alert">
 {{errorText}}
</div>

     <form #eventForm="ngForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" class="form-control"
                required 
                [(ngModel)]="event.name" #name="ngModel" >

          <div *ngIf="name.invalid && (name.dirty || name.touched)"
              class="alert alert-danger">

            <div *ngIf="name.errors.required">
              Event Name is required.
            </div>
          </div>
        </div>
         <div class="form-group">
    <label for="description">Description</label>
    <textarea name="description" id="description" class="form-control" id="description" rows="3"  [(ngModel)]="event.description"></textarea>
  </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" name="location" class="form-control" required id="location" [(ngModel)]="event.location" #location="ngModel">
                <div *ngIf="location.invalid && (location.dirty || location.touched)"
              class="alert alert-danger">

            <div *ngIf="location.errors.required">
              Event Location is required.
            </div>
          </div>
    </div>
 <div class="form-row">
    <div class="form-group col-md-6">
      <label for="fromDateTime">From Date</label>
      <input type="text" name="fromDateTime" class="form-control" required id="fromDateTime" [(ngModel)]="event.fromDateTime" #fromDateTime="ngModel">
                <div *ngIf="fromDateTime.invalid && (fromDateTime.dirty || fromDateTime.touched)"
              class="alert alert-danger">

            <div *ngIf="fromDateTime.errors.required">
              From Date is required.
            </div>
          </div>
    </div>
    <div class="form-group col-md-6">
      <label for="toDateTime">To Date</label>
      <input type="text" name="toDateTime" class="form-control" required id="toDateTime" [(ngModel)]="event.toDateTime" #toDateTime="ngModel">
                      <div *ngIf="toDateTime.invalid && (toDateTime.dirty || toDateTime.touched)"
              class="alert alert-danger">

            <div *ngIf="toDateTime.errors.required">
              To Date is required.
            </div>
          </div>
    </div>
  </div>
    <div class="form-group">
      <label for="pointOfContact">POC</label>
      <input type="text" name="pointOfContact" class="form-control" required id="pointOfContact" [(ngModel)]="event.pointOfContact" #pointOfContact="ngModel">
       <div *ngIf="pointOfContact.invalid && (pointOfContact.dirty || pointOfContact.touched)"
              class="alert alert-danger">

            <div *ngIf="pointOfContact.errors.required">
              POC is required.
            </div>
          </div>
    </div>
      <button type="button" (click)="create()" class="mb-2 btn btn-outline-primary"
              [disabled]="eventForm.invalid">Submit</button>
      <button type="button" class="mb-2 ml-2 btn btn-outline-primary"
              (click)="eventForm.resetForm({})">Reset</button>

  </form>
</div>`
})





export class EventComponent implements OnInit{
  @Output() createEvent = new EventEmitter<boolean>();

    public event:Event={
      "id":null,
      "name":null,
      "description":null,
      "fromDateTime":null,
      "toDateTime":null,
      "pointOfContact":null,
      "status":null,
      "location":null,
      "eventLocation":{
        "address1":null
      }

    };
    public errorText:string;
    public roles:string;
    constructor( private _service:EventsService) {}

    ngOnInit(){
    }

    create(){
      this.event.eventLocation.address1=this.event.location;
     this._service.create(this.event)
     .subscribe(
         data => { this.createEvent.emit(true)},
         error =>  {
           this.errorText=error._body;
       });
    }

    onCancel(){
      this.createEvent.emit(false);
    }
}
