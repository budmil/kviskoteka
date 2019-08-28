import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  
  staralozinka_login: string;
  novalozinka_login: string;
  novalozinka2_login: string;

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }


  
  promeniLozinku() {
    
  }

}
