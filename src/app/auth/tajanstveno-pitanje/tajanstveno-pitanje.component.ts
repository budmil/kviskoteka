import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tajanstveno-pitanje',
  templateUrl: './tajanstveno-pitanje.component.html',
  styleUrls: ['./tajanstveno-pitanje.component.css']
})
export class TajanstvenoPitanjeComponent implements OnInit {

  odgovor : "";

  constructor(private authService : AuthService,
    private snackBar : MatSnackBar,
    private router : Router,
    public dialogRef: MatDialogRef<TajanstvenoPitanjeComponent>,
    @Inject(MAT_DIALOG_DATA) public podaci: {pitanje: string, odgovor: string, korime: string}) {}

    ngOnInit(): void {
    

      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    if (this.odgovor == this.podaci.odgovor) {
        this.router.navigate(["/basNovaLozinka"], { queryParams: { korime: this.podaci.korime } });
     } 
      
      else {
        this.snackBar.open("Nije dobar odgovor.", "", {
          duration: 2 * 1000,
        });
    }
  }

}
