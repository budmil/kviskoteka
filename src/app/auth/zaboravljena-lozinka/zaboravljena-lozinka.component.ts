import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TajanstvenoPitanjeComponent } from '../tajanstveno-pitanje/tajanstveno-pitanje.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent implements OnInit {


  constructor(private authService : AuthService, private router : Router, private fb: FormBuilder, public dialog: MatDialog) { }
  forma : FormGroup;
  ngOnInit() {

    this.forma = this.fb.group({
      korime: ['',Validators.required, this.validirajKorime.bind(this)],
      jmbg: ['',[Validators.required,this.validirajJmbg.bind(this)]]
    }, 
    
    );
  }

  submit() {
    this.authService.proveriJmbgKorime(this.forma.get("korime").value, this.forma.get("jmbg").value).subscribe( response => {
         //opendialog
         const dialogRef = this.dialog.open(TajanstvenoPitanjeComponent, {
          width: '250px',
          data: {pitanje: response.pitanje, odgovor: response.odgovor, korime: response.korime}
        });
    
        dialogRef.afterClosed().subscribe(result => {
         // this.animal = result;
        });
        //opendialog
    });
  }

  validirajKorime(control: AbstractControl) {
    return timer(800).pipe(
      switchMap(() => this.authService.proveriKorime(control.value)),
      map(res => {
        return res.imaKorime ? null : { nemaKorime: true };
      })
    );
  }

  validirajJmbg() {
    if(this.forma) {
      var jmbg = +this.forma.get('jmbg').value;
      jmbg+=10000000000000;
      var kontrolnaCifra = jmbg % 10;
      jmbg = Math.floor(jmbg/10);
      var s = 0;
      for (var j = 0; j <2; j++) {
        for (var i=2; i<=7; i++) {
           s = s + (jmbg % 10)*i;
           jmbg = Math.floor(jmbg / 10);
        }
      }

      var ostatak = s % 11;
      var razlika = 11 - ostatak;

      if (ostatak==1) return {neispravanJmbg:true};
      if (ostatak==0 && kontrolnaCifra!=0) return {neispravanJmbg:true};
      if (ostatak<=11 && ostatak>=1 && kontrolnaCifra!=razlika) return {neispravanJmbg:true};
      if (kontrolnaCifra != razlika) return {neispravanJmbg:true};
      return false;
  }
  }

}


