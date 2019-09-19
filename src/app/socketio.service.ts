import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;


  constructor(private router: Router) { }


  kontektujMe(bojaTakmicara: string, imeTakmicara: string) {
    console.log("konekktuj jme");
    this.socket = io("http://localhost:3000", { query: { tip: bojaTakmicara, takmicar: imeTakmicara } });
  }

  igraPocinje() {
    console.log('igra pocinje');
    console.log(this.socket);
    this.socket.on("igra_pocinje", data => {
      this.router.navigate(["/anagrammulti"]);
    });
  }


  obrisiTakmicara(bojaTakmicara: string, imeTakmicara: string) {
    //   console.log('a');
    //   this.socket.emit("obrisiTakmicara",{tip: bojaTakmicara, takmicar: imeTakmicara});
    this.socket.disconnect();
  }

  noviPlaviTakmicarSeKonektovao(): Observable<any> {
    let ret = new Subject<any>();
    this.socket.on("noviPlaviTakmicar", data => {
      ret.next(data);
    });
    return ret.asObservable();
  }

  igrajKazeCrveni(crveni: string, plavi: string) {
    this.socket.emit("igraj", { crveni: crveni, plavi: plavi });
  }

  /////////////////vesala///////////////////////////

  vratiRecZaPogadjanje(): Observable<any> {
    let ret = new Subject<any>();
    console.log('vrati rec za pogadjanje');
    console.log(this.socket);
    this.socket.emit('pogodak');
    this.socket.on("recZaPogadjanje", data => {
      ret.next(data);
    });
    return ret.asObservable();
  }



  zavrsio(pogodio: Boolean) {
    console.log("ZAVRSIO");
    let ret = new Subject<any>();
    this.socket.emit('pogodio', pogodio);
    this.socket.on('rezultat', rezultat => {
      ret.next(rezultat);
      console.log(rezultat);
      if (rezultat.naRedu == "plavi") this.router.navigate(["/vesalamulti"]); else this.router.navigate(["/peharmulti"]);
    });
    return ret.asObservable();
  }




  /////////////////////mojbroj////////////////////////

  vratiPocetniBroj(): Observable<any> {
    console.log("usao u service");
    console.log("this.socket");
    let ret = new Subject<any>();
    this.socket.emit('mojbroj/vratiPocetniBroj');
    this.socket.on("mojbroj/pocetniBroj", data => {
      console.log("sacekao event u servicu");
      console.log(data);
      ret.next(data);
    });
    return ret.asObservable();
  }

  dodajBroj(koji: String, broj: any) {
    this.socket.emit('mojbroj/dodajBroj', { koji: koji, broj: broj });
  }

  cekamBroj(): Observable<any> {
    let ret = new Subject<any>();
    this.socket.on("mojbroj/dodatBroj", data => {
      ret.next(data);
    });
    return ret.asObservable();
  }


  zavrsioMojbroj() {
    this.socket.emit('anagram/zavrsioAnagram');
    this.socket.on("anagram/mozesDaljeAnagram", data => {
      this.router.navigate(['/vesalamulti']);
    });
  }

  //////////////////////////////////////anagram////////////////////////////////////////////

  dohvatiAnagram(): Observable<any> {
    console.log("dohvati anagram service");
    let ret = new Subject<any>();
    this.socket.emit('anagram/dohvatiAnagram');
    this.socket.on("anagram/vracamAnagram", data => {
      ret.next(data);
    });
    return ret.asObservable();
  }


  zavrsioAnagram() {
    console.log('zavrsio anagram service');
    this.socket.emit('anagram/zavrsioAnagram');
    this.socket.on("anagram/mozesDaljeAnagram", data => {
      this.router.navigate(['/mojbrojmulti']);
    });
  }

  //////////////////////////////////////////pehar//////////////////////////////////////////////



  dohvatiPehar(odgovor:string,boja:string): Observable<any> {
    let ret = new Subject<any>();
    this.socket.emit('pehar/dohvatiPehar', {odgovor: odgovor, boja: boja});
    this.socket.on("pehar/vracamPehar", data => {
      ret.next(data);
    });
    return ret.asObservable();
  }
}
