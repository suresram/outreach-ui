import { LoginService } from './login.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginMockService} from './mocks/login.service.mock';
import { Cookie } from 'ng2-cookies';
describe('LoginComponent', () => {
   let comp: LoginComponent;
   let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
             imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: LoginService, useClass: LoginMockService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            comp = fixture.componentInstance; 
        });
    }));

    it(`should login`, async(() => {
      comp.login();
      expect( Cookie.get('userId')).toBe("");
    }));
 afterEach(() => {
    fixture.destroy();
    comp = null;
  });
});