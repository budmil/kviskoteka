import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takmicar',
  templateUrl: './takmicar.component.html',
  styleUrls: ['./takmicar.component.css']
})
export class TakmicarComponent implements OnInit {

  constructor(private http: HttpClient) { }
  korime : string;
  rangTabelaDanas ;
  ngOnInit() {
    this.korime = localStorage.getItem("korime");
    this.http.get<{rangTabelaDanas : any}>('http://localhost:3000/api/rangliste/rangDanas')
    .subscribe(ret => {
      this.rangTabelaDanas = ret.rangTabelaDanas;
    });
  }
  
  
}
