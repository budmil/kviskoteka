import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bas-nova-lozinka',
  templateUrl: './bas-nova-lozinka.component.html',
  styleUrls: ['./bas-nova-lozinka.component.css']
})
export class BasNovaLozinkaComponent implements OnInit{

  constructor(private route: ActivatedRoute, private authService : AuthService, private fb: FormBuilder) { }

  korime : string;
  forma : FormGroup;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.korime = params['korime'];
    });


    this.forma = this.fb.group({
      novaLozinka: ['', Validators.required],
      potvrdaNoveLozinke: ['',[Validators.required,this.validirajLozinku.bind(this)]]
    }, 
    
    );
  }

  promeniZaboravljenuLozinku() {
    this.authService.promeniZaboravljenuLozinku(this.korime, this.forma.get('novaLozinka').value);
  }


  validirajLozinku(control: AbstractControl) {
    if(this.forma)
    return this.forma.get('novaLozinka').value===this.forma.get('potvrdaNoveLozinke').value ? null : {razliciteLozinke:true};
  }

 

}
