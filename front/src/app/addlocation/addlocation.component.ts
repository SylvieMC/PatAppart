import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Logement } from '../model/model.logement';
import { Animal } from '../model/model.animal';
import { Utilisateur } from '../model/model.utilisateur';

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

  utilisateurId = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(){

    const target = {
      adresse: ['', [Validators.required]],
      description: ['', []],
      code_postal: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      date_debut: ['', [Validators.required]],
      date_fin: ['', [Validators.required]],
      animal: ['', [Validators.required]],
      photo_url: ['', []]
    };

    this.logementForm = this.formBuilder.group(target);
  }
  public createLogement(){
    this.errorMessage = null;
    this.submitted = true;

    if (this.logementForm.invalid) {
      return;
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
    //logement.animal_id = this.animalId;

    console.log('Request to save animal %o', logement);

    this.dataService.createAnimal(logement)
      .subscribe(data => {
        console.log("La requete a été crée")
      }, error => {
        console.log("La requete n'a pas pu être crée")
      });
  }

}
