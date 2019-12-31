import {  HttpClientTestingModule,  HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockEvents } from './mocks/event.mock';
import { EventsService } from './events.service';
import { environment } from './../environments/environment';
describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });

    // inject the service
    service = TestBed.get(EventsService);
    httpMock = TestBed.get(HttpTestingController);
  });

    it('should fetch all the events', () => {
    service.getEvents("open").subscribe((data: any) => {
      expect(data.length).toEqual(1);
    });

    const req = httpMock.expectOne(environment.apiUrl+"/events/v1/open", 'get events');
    expect(req.request.method).toBe('GET');

    req.flush(mockEvents);

    httpMock.verify();
  });

   it('should return error while fetching all the events', () => {

    service.getEvents("closed").subscribe((data: any) => {
      expect(data.length).toEqual(1);
    });

    const req = httpMock.expectOne(environment.apiUrl+"/events/v1/closed", 'get events error');
    expect(req.request.method).toBe('GET');

    req.flush(null, {status: 400, statusText: "Bad Request"});

    httpMock.verify();
  });

   it('should register for the event', () => {
    service.register("eventId").subscribe((data: any) => {
      expect(data).toBe('success');
    });

    const req = httpMock.expectOne(environment.apiUrl+"/registration/v1/eventId", 'register event');
    expect(req.request.method).toBe('POST');

    req.flush("success");

    httpMock.verify();
  });

   it('should return error while registering for the event', () => {
    service.register("eventId1").subscribe((data: any) => {
      expect(data).toBe('success');
    });

    const req = httpMock.expectOne(environment.apiUrl+"/registration/v1/eventId1", 'register event error');
    expect(req.request.method).toBe('POST');

    req.flush(null, {status: 400, statusText: "Bad Request"});

    httpMock.verify();
  });

   it('should create a event', () => {
    service.create(mockEvents[0]).subscribe((data: any) => {
      expect(data).toBe(mockEvents[0]);
    });

    const req = httpMock.expectOne(environment.apiUrl+"/admin/v1", 'create event');
    expect(req.request.method).toBe('POST');

    req.flush(mockEvents[0]);

    httpMock.verify();
  });


   it('should return error while creating a event', () => {
    service.create(null).subscribe((data: any) => {
      expect(data).toBe(null);
    });

    const req = httpMock.expectOne(environment.apiUrl+"/admin/v1", 'create event error');
    expect(req.request.method).toBe('POST');

    req.flush(null, {status: 400, statusText: "Bad Request"});

    httpMock.verify();
  });

 afterEach(() => {
    service = null;
    httpMock=null;
  });

});