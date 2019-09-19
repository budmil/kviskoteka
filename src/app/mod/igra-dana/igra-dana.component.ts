import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-igra-dana',
  templateUrl: './igra-dana.component.html',
  styleUrls: ['./igra-dana.component.css']
})
export class IgraDanaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  isLoading = true;
  igraoDanas : Boolean;
  korime : String;
  ngOnInit() {
    this.korime = localStorage.getItem("korime");
    this.http.get<{igraoDanas:boolean}>('http://localhost:3000/api/rangliste/igraoDanas' + '?korime=' + this.korime)
    .subscribe(res => {
        this.igraoDanas = res.igraoDanas;
        this.isLoading = false;
    });

  }

}
