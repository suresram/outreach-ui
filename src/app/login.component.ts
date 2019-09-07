import { Component } from '@angular/core';
import {LoginService} from './login.service'

@Component({
  selector: 'login-form',
  providers: [LoginService],  
  template: `
    <div class="col-sm-6">
        <h1>Login</h1>
        <div class="col-sm-12 form-group">
             <label>UserId</label>
             <input class="form-control" type="text" [(ngModel)]="loginData.userId" />
        </div>
        <div class="col-sm-12 form-group">
            <label>Password</label>
            <input class="form-control" type="password"  [(ngModel)]="loginData.password"/>
        </div>
        <div class="col-sm-12">
            <button class="btn btn-primary pull-right" (click)="login()" type="submit">Login</button>
        </div>
    </div>`
})
export class LoginComponent {
    public loginData = {userId: "", password: ""};

    constructor(private _service:LoginService) {}
 
    login() {
        this._service.obtainAccessToken(this.loginData);
    }
}
