import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators, ValidationErrors } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Logement } from '../model/model.logement';
import { Animal } from '../model/model.animal';
import { Utilisateur } from '../model/model.utilisateur';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss']
})
export class AddlocationComponent implements OnInit {

  logementForm: FormGroup;
  errorMessage: string;
  submitted = false;
  animals: Array<Animal> = [];
  utilisateur: Utilisateur;
  utilisateurId = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;
  photo = 'https://patappart.sylvie-cassim.com/assets/img/default.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAnimals();
  }

  public createForm(){

    const target = {
      adresse: ['', [Validators.required]],
      description: ['', []],
      code_postal: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      date_debut: ['', [Validators.required]],
      date_fin: ['', [Validators.required]],
      photo_url: ['', []],
      list_animals: ['', []],
    };
    this.logementForm = this.formBuilder.group(target);

  }

  public createLogement(){

    this.errorMessage = null;
    this.submitted = true;

    if (this.logementForm.invalid) {
      this._snackBar.open('La demande de garde n\'a pas pu être créée.', '', {
        duration: 2000,
      });
    }

    const logement = new Logement();
    logement.adresse = this.logementForm.controls.adresse.value;
    logement.description = this.logementForm.controls.description.value;
    logement.code_postal = this.logementForm.controls.code_postal.value;
    logement.description = this.logementForm.controls.description.value;
    logement.departement = this.logementForm.controls.departement.value;
    logement.date_debut = this.logementForm.controls.date_debut.value;
    logement.date_fin = this.logementForm.controls.date_fin.value;
    logement.photo_url = this.logementForm.controls.photo_url.value;

    const animal_name: string = this.logementForm.controls.list_animals.value;
    const animal = this.animals.find(a => a.nom === animal_name);

    this.dataService.createLogement(logement)
    .subscribe(logementResponse => {
      const logementResult: Logement = logementResponse.body as Logement;
      const logementId: number = logementResult.id;
      animal.logement_id = logementId;
      this.updateAnimal(animal);
      this._snackBar.open('La demande de garde à été créée!', '', {
        duration: 2000,
      });
    }, error => {
      console.log('error : %o', error);
    })

  }

  public getAnimals(): void {

    this.dataService.getAllAnimals()
    .subscribe(data => {
      const animals: Array<Animal> =  data.body as Array<Animal>;
      this.animals = animals.filter(a => a.utilisateur_id === this.utilisateurId)
    })

  }

  private updateAnimal(animal: Animal): void {

    this.dataService.updateAnimal(animal)
    .subscribe(data => {
      console.log(data);
    });

  }

}
