import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  korime_login: string;
  lozinka_login: string;

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }


  
  login() {
    this.authService.proveriPodatkeZaLogin(this.korime_login, this.lozinka_login);

  }

}
