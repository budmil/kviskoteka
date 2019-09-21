import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import io from 'socket.io-client';


@Component({
  selector: 'app-supervizor',
  templateUrl: './supervizor.component.html',
  styleUrls: ['./supervizor.component.css']
})
export class SupervizorComponent implements OnInit {


  rebusForma: FormGroup;
  linkSlike: String = "";

  private socket: any;
  private tabelaNepostojecihPojmovaGeografija :
  {
    slovo: string,
     kategorija: string, 
     termin: string,
      _i:any, 
      _j: any   
  } [] 
  = new Array();



  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {

    this.socket = io("http://localhost:3000", { query: { supervizor: "supervizor" } });
    this.socket.on("zaSupervizora", pojam => {
      this.tabelaNepostojecihPojmovaGeografija.push(pojam.pojam.pojam);
      console.log(pojam);
    });


    this.rebusForma = this.fb.group({
      slika: ['', [Validators.required]],
      rebusResenje: ['']
    });
  }

  ////////////////////////////ANAGRAM////////////////////////////////

  zagonetka: string;
  resenje: string;

  dodajAnagram() {
    console.log(this.zagonetka);
    console.log(this.resenje);

    this.http.post<{ message: string }>('http://localhost:3000/api/igre/anagram/dodajAnagram', { zagonetka: this.zagonetka, resenje: this.resenje })
      .subscribe(responseData => {
        alert(responseData.message);
      }
      );
  }


  /////////////////////////////PEHAR//////////////////////////////////

  gore9pitanje: string; gore9odgovor: string;
  gore8pitanje: string; gore8odgovor: string;
  gore7pitanje: string; gore7odgovor: string;
  gore6pitanje: string; gore6odgovor: string;
  gore5pitanje: string; gore5odgovor: string;
  gore4pitanje: string; gore4odgovor: string;
  goredole3pitanje: string; goredole3odgovor: string;
  dole4pitanje: string; dole4odgovor: string;
  dole5pitanje: string; dole5odgovor: string;
  dole6pitanje: string; dole6odgovor: string;
  dole7pitanje: string; dole7odgovor: string;
  dole8pitanje: string; dole8odgovor: string;
  dole9pitanje: string; dole9odgovor: string;



  dodajPehar() {
    this.http.post<{ message: string }>('http://localhost:3000/api/igre/pehar/dodajPehar', {
      gore9: { pitanje: this.gore9pitanje, odgovor: this.gore9odgovor },
      gore8: { pitanje: this.gore8pitanje, odgovor: this.gore8odgovor },
      gore7: { pitanje: this.gore7pitanje, odgovor: this.gore7odgovor },
      gore6: { pitanje: this.gore6pitanje, odgovor: this.gore6odgovor },
      gore5: { pitanje: this.gore5pitanje, odgovor: this.gore5odgovor },
      gore4: { pitanje: this.gore4pitanje, odgovor: this.gore4odgovor },
      goredole3: { pitanje: this.goredole3pitanje, odgovor: this.goredole3odgovor },
      dole4: { pitanje: this.dole4pitanje, odgovor: this.dole4odgovor },
      dole5: { pitanje: this.dole5pitanje, odgovor: this.dole5odgovor },
      dole6: { pitanje: this.dole6pitanje, odgovor: this.dole6odgovor },
      dole7: { pitanje: this.dole7pitanje, odgovor: this.dole7odgovor },
      dole8: { pitanje: this.dole8pitanje, odgovor: this.dole8odgovor },
      dole9: { pitanje: this.dole9pitanje, odgovor: this.dole9odgovor }
    })
      .subscribe(responseData => {
        alert(responseData.message);
      }
      );
  }


  ///////////////////////////////REBUS//////////////////////////////////////


  izabranaSlika(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.rebusForma.patchValue({ slika: file });
    this.rebusForma.get('slika').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.linkSlike = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  dodajRebus() {

    const podaci = new FormData();

    podaci.append("slika", this.rebusForma.get('slika').value, this.rebusForma.get('rebusResenje').value + "_rebus");
    podaci.append("resenje", this.rebusForma.get('rebusResenje').value);

    this.http.post<{ message: string }>('http://localhost:3000/api/igre/rebus/dodajRebus', podaci)
      .subscribe(responseData => {
        alert(responseData.message);
      });
  }


//////////////////////////////GEOGRAFIJA//////////////////////////////////

odobriPojam(pojam: any) {
  this.socket.emit("supervizor/vracamProverenPojam", {pojam: pojam, odobravam: true});
 // this.tabelaNepostojecihPojmovaGeografija.filte
}

odbijPojam(pojam: any) {
  this.socket.emit("supervizor/vracamProverenPojam", {pojam: pojam, odobravam: false});
}


}
