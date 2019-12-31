import { HttpClientTestingModule,  HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';
import { LoginComponent } from './login.component';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
    { path: 'login', component: LoginComponent }])],
      providers: [LoginService]
    });

    // inject the service
    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should login', () => {
      let loginData:any ={
        userId:"test",
        password: "test"
      }
      let token:any={
        access_token:"123",
        roles:"any"
      }
    service.obtainAccessToken(loginData);
    const req = httpMock.expectOne(environment.apiUrl+"/oauth/token", 'Login');
    expect(req.request.method).toBe('POST');

    req.flush(token);
    httpMock.verify();
    expect(Cookie.get('userId')).toBe('test');
    service.checkCredentials();
    service.logout();
    expect(Cookie.get('userId')).toBe('');
    service.checkCredentials();
    const router: Router = TestBed.get(Router);
    expect(router.url).toBe("/");
  });

  it('throw error while login', () => {
      let loginData:any ={
        userId:"test",
        password: "test"
      }
      let token:any={
        access_token:"123",
        roles:"any"
      }
    service.obtainAccessToken(loginData);
    const req = httpMock.expectOne(environment.apiUrl+"/oauth/token", 'Login');
    expect(req.request.method).toBe('POST');

    req.flush(null, {status: 400, statusText: "Bad Request"});
    httpMock.verify();
  });
 afterEach(() => {
    service = null;
    httpMock=null;
  });
});