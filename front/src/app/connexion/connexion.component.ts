import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Connexion } from '../model/model.connexion';
import { Router } from '@angular/router';
import { Token } from '../model/model.token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})

export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {

    const target = {
      email: ['', [Validators.required]],
      mot_de_passe: ['', [Validators.required]],
    };
    this.loginForm = this.formBuilder.group(target);

  }

  public connexionUtilisateur(): void {

    this.errorMessage = null;
    this.submitted = true;

    if (this.loginForm.invalid) {
      this._snackBar.open('Erreur de connexion. Combinaison email / mot de passe invalide', '', {
        duration: 2000,
      });
    }

    const connexion = new Connexion();
    connexion.email = this.loginForm.controls.email.value;
    connexion.mot_de_passe = this.loginForm.controls.mot_de_passe.value;

    this.dataService.connexion(connexion)
      .subscribe(data => {
        console.log("Connexion effectuée");
        localStorage.setItem('token', JSON.stringify(data.body as Token));
        localStorage.setItem('utilisateur', JSON.stringify(data.body as Token));
        this.router.navigate(['home']);
        this._snackBar.open('Bienvenue à Pat\'Appart!!', '', {
          duration: 2000,
        });
      }, error => {
        console.log("Une erreur de connexion s'est produite")
      });

  }

}
