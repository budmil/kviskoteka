import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = true;

  jeTakmicar = false;
  jeAdmin = false;
  jeSupervizor = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {

   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authService.getAuthStatusListener().subscribe(isAuth => {
     this.userIsAuthenticated = isAuth;
   });

   switch(this.authService.getTip()) {
    case "Takmicar": this.jeTakmicar = true; this.jeAdmin = false; this.jeSupervizor = false; break;
    case "Admin": this.jeTakmicar = false; this.jeAdmin = true; this.jeSupervizor = false; break;
    case "Supervizor": this.jeTakmicar = false; this.jeAdmin = false; this.jeSupervizor = true; break;
    default: this.jeTakmicar = false; this.jeAdmin = false; this.jeSupervizor = false; break;
   }

   this.authService.getTipKorisnikaListener().subscribe(tip => {
    switch(tip) {
      case "takmicar": this.jeTakmicar = true; this.jeAdmin = false; this.jeSupervizor = false; break;
      case "admin": this.jeTakmicar = false; this.jeAdmin = true; this.jeSupervizor = false; break;
      case "supervizor": this.jeTakmicar = false; this.jeAdmin = false; this.jeSupervizor = true; break;
      case "niko": this.jeTakmicar = false; this.jeAdmin = false; this.jeSupervizor = false; break;
      default: this.jeTakmicar = false; this.jeAdmin = false; this.jeSupervizor = false; break;
    }
   });
  }



  izlogujSe() {
    this.authService.izlogujSe();
  }

}
