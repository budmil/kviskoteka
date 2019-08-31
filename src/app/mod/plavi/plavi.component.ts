import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-plavi',
  templateUrl: './plavi.component.html',
  styleUrls: ['./plavi.component.css']
})
export class PlaviComponent implements OnInit {

  blabla : string = "blabla";

  private socket : any;
  forma : FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.socket = io("http://localhost:3000");

    this.forma = this.fb.group({
      tekst: ['']
    });

    this.socket.on("podaci", data => {
      this.blabla = data;
      console.log(data);
    });

  }


  kliknuo() {
    this.socket.emit("klik", this.forma.get('tekst').value);
  }  

}
