import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Utilisateur } from '../model/model.utilisateur';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {

    const target = {
      login: ['', [Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date_de_naissance: ['', [Validators.required]],
      description: ['', []],
    };
    this.registerForm = this.formBuilder.group(target);

  }

  public createUtilisateur(): void {

    this.errorMessage = null;
    this.submitted = true;

    if (this.registerForm.invalid) {
      this._snackBar.open('Votre compte n\'a pas pu être créé.', '', {
        duration: 2000,
      });
    }

    const utilisateur = new Utilisateur();
    utilisateur.login = this.registerForm.controls.login.value;
    utilisateur.mot_de_passe = this.registerForm.controls.mot_de_passe.value;
    utilisateur.email = this.registerForm.controls.email.value;
    utilisateur.date_de_naissance = this.registerForm.controls.date_de_naissance.value;
    utilisateur.description = this.registerForm.controls.description.value;

    this.dataService.createUtilisateur(utilisateur)
      .subscribe(data => {
        this._snackBar.open('Votre compte a été créé!', '', {
          duration: 2000,
        });
      }, error => {
        console.log("Votre compte n'a pas pu être créé.")
      });

  }

}
