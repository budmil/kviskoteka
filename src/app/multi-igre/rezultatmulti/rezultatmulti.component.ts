import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rezultatmulti',
  templateUrl: './rezultatmulti.component.html',
  styleUrls: ['./rezultatmulti.component.css']
})
export class RezultatmultiComponent implements OnInit {
  poeniAnagram;
  poeniMojbroj;
  poeniVesala;
  poeniGeografija;
  poeniPehar;

  poeniPlavi;
  poeniCrveni;

  ukupno;
  cekam: Boolean = true;

  constructor(private http: HttpClient, private socketioService: SocketioService) {




    //  this.http.post<{message:string}>('http://localhost:3000/api/igre/igradana/poeni', podaci)
    //   .subscribe(responseData => {
    //   alert(responseData.message);
    //  });


  }
  cnt = 0;

  vratiRezultatSubscription : Subscription;
  ngOnInit() {


    this.poeniAnagram = localStorage.getItem("poeniAnagram");
    this.poeniMojbroj = localStorage.getItem("poeniMojbroj");
    this.poeniVesala = localStorage.getItem("poeniVesala");
    this.poeniGeografija = localStorage.getItem("poeniGeografija");
    this.poeniPehar = localStorage.getItem("poeniPehar");

    this.ukupno = eval(this.poeniAnagram + "+" + this.poeniMojbroj + "+" + this.poeniVesala + "+" + this.poeniGeografija + "+" + this.poeniPehar);



    var podaci = {
      poeniAnagram: this.poeniAnagram,
      poeniMojbroj: this.poeniMojbroj,
      poeniVesala: this.poeniVesala,
      poeniGeografija: this.poeniGeografija,
      poeniPehar: this.poeniPehar,
      poeniUkupno: this.ukupno,
      takmicar: localStorage.getItem("korime"),
      boja: localStorage.getItem("boja")
    }
    console.log("SALJEM PODATKE");
    console.log(podaci);
    this.vratiRezultatSubscription = this.socketioService.vratiRezultat(podaci)
      .subscribe(res => {
        console.log("RESPONSE");
        console.log(res);
        if (this.cnt == 0) {
          this.cnt++;
          if (res.rezultat.boja == "plavi") {
            this.poeniPlavi = res.rezultat;
          } else {
            this.poeniCrveni = res.rezultat;
          }
        } else {
          if (res.rezultat.boja == "plavi") {
            this.poeniPlavi = res.rezultat;
          } else {
            this.poeniCrveni = res.rezultat;
          }
          console.log(this.poeniPlavi);
          console.log(this.poeniCrveni);
          this.cekam = false;
          if (localStorage.getItem("boja") == "plavi")
          this.http.post<{ message: string }>('http://localhost:3000/api/igre/multi/poeni', {plavi: this.poeniPlavi, crveni: this.poeniCrveni})
            .subscribe(responseData => {
             console.log(responseData.message);
            });
            this.vratiRezultatSubscription.unsubscribe();
        }
      });
  }

}
