import { Component, OnInit, OnDestroy } from '@angular/core';
import io from 'socket.io-client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/socketio.service';


@Component({
  selector: 'app-crveni',
  templateUrl: './crveni.component.html',
  styleUrls: ['./crveni.component.css']
})
export class CrveniComponent implements OnInit, OnDestroy{

  // blabla : string = "blabla";
  // waitingRedPlayer : Boolean;
  // forma : FormGroup;

  private socket: any;
  spremniTakmicari : string[];
  korime : string;

  constructor(private fb : FormBuilder,private router : Router, private socketioService : SocketioService) { }

  ngOnInit() {
    this.korime = localStorage.getItem('korime');


    //this.socket = io("http://localhost:3000",{query: {tip: "crveni", takmicar: this.korime}});
    this.socketioService.kontektujMe("crveni",this.korime);


    this.socketioService.noviPlaviTakmicarSeKonektovao()
      .subscribe(data => {
        this.spremniTakmicari = data;
      });
   

  }




  igrajte (korime : string){

    this.socketioService.igrajKazeCrveni(this.korime,korime);
    this.router.navigate(["/vesalamulti"]);
  }

  ngOnDestroy() {
   // this.socketioService.obrisiTakmicara("crveni", this.korime);
  }
 
}
