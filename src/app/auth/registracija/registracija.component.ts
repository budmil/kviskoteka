import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  

  constructor(private authService : AuthService, private fb : FormBuilder) { }

  regForma : FormGroup;

  

  ngOnInit() {
    this.regForma = this.fb.group({
      ime: [''],
      prezime: [''],
      email: [ 
         '',
        [],
      ],
      zanimanje: [''],
      korime: [''],
      lozinka: [''],
      pol: [''],
      jmbg: [''],
      potvrdaLozinke: ['']
    });


  }


  validirajEmail(control: AbstractControl)  {
   // var res = this.authService.proveriEmail(control.value);
     // return res ? null : { emailZauzet: true };
 }





  registracija() {

    this.authService.dodajZahtevZaRegistraciju(this.regForma.get('ime').value, this.regForma.get('prezime').value, this.regForma.get('email').value, this.regForma.get('zanimanje').value, this.regForma.get('korime').value, this.regForma.get('lozinka').value, this.regForma.get('pol').value, this.regForma.get('jmbg').value);

  }
}
