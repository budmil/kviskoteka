import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  
  forma : FormGroup;

  constructor(public authService : AuthService, private fb : FormBuilder) { }

  ngOnInit() {

    this.forma = this.fb.group({
      korime: ['',Validators.required, this.validirajKorime.bind(this)],
      staraLozinka: ['', Validators.required],
      novaLozinka: ['', Validators.required],
      potvrdaNoveLozinke: ['',[Validators.required,this.validirajLozinku.bind(this)]]
    }, 
    
    );
  }


  
  promeniLozinku() {
    this.authService.promeniLozinku(this.forma.get('korime').value, this.forma.get('staraLozinka').value, this.forma.get('novaLozinka').value);
  }

  validirajLozinku(control: AbstractControl) {
    if(this.forma)
    return this.forma.get('novaLozinka').value===this.forma.get('potvrdaNoveLozinke').value ? null : {razliciteLozinke:true};
  }

   
 validirajKorime(control: AbstractControl)  {
  
  return timer(800).pipe(
    switchMap(() => this.authService.proveriKorime(control.value)),
    map(res => {
      return res.imaKorime ? null : { nepostojeceKorime: true };
    })
  );
}


}
