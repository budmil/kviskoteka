import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {



  isAuthenticated : Boolean = false;

  constructor(private authService : AuthService, private http: HttpClient) { }

  najbolji30;
  najbolji20;

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();

    this.authService.getAuthStatusListener()
      .subscribe(isAuth =>{
        this.isAuthenticated = isAuth;
      });


      this.http.get<{najbolji30 : any}>('http://localhost:3000/api/rangliste/najbolji30')
      .subscribe(ret => {
        this.najbolji30 = ret.najbolji30;
      });

      this.http.get<{najbolji20 : any}>('http://localhost:3000/api/rangliste/najbolji20')
      .subscribe(ret => {
        this.najbolji20 = ret.najbolji20;
      });
  }


 


}
