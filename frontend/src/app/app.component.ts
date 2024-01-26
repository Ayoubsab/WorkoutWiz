import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'workout-app-front';
  authService = inject(AuthService)
  loginUrl = environment.redirectUrlLogin
  isLoggedIn = false;


  ngOnInit(): void {
    this.authService.isLoggedIn().then((logged) =>{
      if (logged){
        this.isLoggedIn = true;
      }
    })
  }

  get username(){
    if (this.isLoggedIn){
      return this.authService.getUsername()
    }

    return null
  }

  public logout(){
    this.authService.logout()
  }

  

  
  

}
