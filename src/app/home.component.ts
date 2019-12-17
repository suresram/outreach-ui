import {Component,ViewChild } from '@angular/core';
import {EventsComponent} from './events.component'
import {LoginService} from './login.service'
 import { Cookie } from 'ng2-cookies';
@Component({
    selector: 'home-header',
    providers: [LoginService],
  template: `<div class="container" >
    <div class="content">
    <div class="row">
        <h4 class="col-sm-6 text-secondary">Welcome {{userId}}!!</h4>
        <div class="col-sm-6">
        <a class="btn btn-primary pull-right float-right"(click)="logout()" href="#">Logout</a>
        </div>
    </div>
    </div>
    <events *ngIf="!enableEventForm"  (createEvent)="enableOrDisableEventForm($event)"></events>
    <event-form *ngIf="enableEventForm" (createEvent)="onCreateEvent($event)"></event-form>
</div>`
})
 
export class HomeComponent {
 
 @ViewChild(EventsComponent) eventsComponent:EventsComponent;
     public enableEventForm:boolean;
    public userId:string;
    constructor(
        private _service:LoginService){}
 
    ngOnInit(){
        this._service.checkCredentials();
        this.userId=Cookie.get('userId');
    }
 
    logout() {
        this._service.logout();
    }

   enableOrDisableEventForm(enableEventForm: boolean) {
    this.enableEventForm=enableEventForm;
  }

  onCreateEvent(eventCreated: boolean){
    this.enableEventForm=false;
    if(eventCreated && this.eventsComponent){
      this.eventsComponent.getEvents();
    }
  }

}