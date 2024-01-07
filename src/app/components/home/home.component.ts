import { Component, inject } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authService = inject(KeycloakService)
  

  public logout():void {
    console.log(this.authService)
    this.authService.logout("http://localhost:4200/");
  }

}
