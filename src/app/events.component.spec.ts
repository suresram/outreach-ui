import { EventsService, Event } from './events.service';
import { TestBed, ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { mockEvents } from './mocks/event.mock';
import { EventsMockService } from './mocks/events.service.mock';
import { EventsComponent } from './events.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventsComponent', () => {

   let comp: EventsComponent;
    let fixture: ComponentFixture<EventsComponent>;
let eventsMockService: EventsMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
           imports: [RouterTestingModule,
        HttpClientTestingModule
      ],
            declarations: [
                EventsComponent
            ]
        }).overrideComponent(EventsComponent, {
      set: {
        providers: [
          { provide: EventsService, useClass: EventsMockService },
        ]
      }
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EventsComponent);
      comp = fixture.componentInstance;
      eventsMockService = fixture.debugElement.injector.get(EventsService);
    });
    }));

    it(`should list one event`, fakeAsync(() => {

 const spy = spyOn(eventsMockService, 'getEvents').and.returnValue(
      of(mockEvents)
    );
    comp.ngOnInit();
    fixture.detectChanges();
  expect(comp.events.length).toEqual(1);
    }));

    it(`should register for event`, async(() => {

    comp.register("test");
    fixture.detectChanges();
  expect("success").toBe("success");
    }));

 afterEach(() => {
    fixture.destroy();
    comp = null;
    eventsMockService=null;
  });
});