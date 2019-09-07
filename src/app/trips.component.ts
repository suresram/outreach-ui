import { Component, OnInit } from '@angular/core';
import {TripService, Trip} from './trip.service'

@Component({
  selector: 'trip-details',
  providers: [TripService],  
  template: `<div class="container">
    <h2 class="col-sm-12">Trip Summary</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>From Location</th>
          <th>To Location</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let trip of trips">
         <th scope="row">{{trip.tripId}}</th>
          <td>{{trip.fromLocation}}</td>
          <td>{{trip.toLocation}}</td>
          <td>{{trip.startTime}}</td>
          <td>{{trip.endTime}}</td>
          <td>{{trip.status}}</td>
        </tr>
      </tbody>
    </table>
</div>`
})

export class TripsComponent implements OnInit{

    public trips:Trip[]=[];
    constructor(private _service:TripService) {}

    ngOnInit(){
        this._service.getTrips()
         .subscribe(
                     data => this.trips = data,
                     error =>  console.log(error));
    }
}
