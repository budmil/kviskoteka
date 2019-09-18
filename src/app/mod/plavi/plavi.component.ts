import { Component, OnInit, OnDestroy } from '@angular/core';
import io from 'socket.io-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/socketio.service';

@Component({
  selector: 'app-plavi',
  templateUrl: './plavi.component.html',
  styleUrls: ['./plavi.component.css']
})
export class PlaviComponent implements OnInit, OnDestroy {

  korime : string;
  
  constructor(private fb : FormBuilder, private router : Router, private socketioService : SocketioService) { }

  ngOnInit() {
    this.korime = localStorage.getItem('korime');
    localStorage.setItem("boja", "plavi");
    this.socketioService.kontektujMe("plavi",this.korime);
  
    this.socketioService.igraPocinje();
  }


  ngOnDestroy() {
   // this.socketioService.obrisiTakmicara("plavi", this.korime);
  }


}
