import {Component} from '@angular/core';
import {LoginService} from './login.service'
 import { Cookie } from 'ng2-cookies';
@Component({
    selector: 'home-header',
    providers: [LoginService],
  template: `<div class="container" >
    <div class="content">
        <h1 class="col-sm-6">Welcome {{userId}}!!</h1>
        <a class="btn btn-default pull-right"(click)="logout()" href="#">Logout</a>
    </div>
    <trip-details></trip-details>
</div>`
})
 
export class HomeComponent {
 
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
}