import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takmicar',
  templateUrl: './takmicar.component.html',
  styleUrls: ['./takmicar.component.css']
})
export class TakmicarComponent implements OnInit {


  korime : string;
  rangTabelaDanas = new Array();
  rangTabelaMulti = new Array();


  constructor(private http: HttpClient) { 


    this.korime = localStorage.getItem("korime");
    this.http.get<{rangTabelaDanas : any}>('http://localhost:3000/api/rangliste/rangDanas')
    .subscribe(ret => {
      this.rangTabelaDanas = ret.rangTabelaDanas;
    });

    this.http.post<{rangTabelaMulti : any}>('http://localhost:3000/api/rangliste/rangMulti', {korime: this.korime})
    .subscribe(ret => {
      this.rangTabelaMulti = ret.rangTabelaMulti;
    });






  }
 

  ngOnInit() {
   
  }
  
  
}
