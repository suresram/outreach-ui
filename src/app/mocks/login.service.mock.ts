import {Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class LoginMockService {

  obtainAccessToken(loginData){
    Cookie.set('userId', '');
  }
}