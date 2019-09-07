import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
@Injectable()
export class LoginService {
  constructor(
    private _router: Router, private _http: Http){}
 
  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.userId);
    params.append('password',loginData.password);    
    params.append('grant_type','password');
    params.append('client_id','s2-client');

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("s2-client:secret")});
    let options = new RequestOptions({ headers: headers });
     this._http.post('http://localhost:8762/oauth/token', params.toString(), options)
    .map(res => res.json())
    .subscribe(
      data => this.saveToken(data, loginData.userId),
      err => alert('Invalid Credentials')
    ); 
  }


  saveToken(token, userId){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("userId",userId, expireDate);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    this._router.navigate(['/']);
  }

  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);
    }
  } 

  logout() {
    Cookie.delete('access_token');
    Cookie.delete('userId');
    this._router.navigate(['/login']);
  }
}