import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Utilisateur } from '../model/model.utilisateur';
import { Animal } from '../model/model.animal';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})

export class CompteComponent implements OnInit {
  animalForm: FormGroup;
  errorMessage: string;
  submitted = false;
  utilisateur: Utilisateur;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.getCompteUtilisateur();
    this.createForm();
  }
  private getCompteUtilisateur(): void{
    this.utilisateur = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')).utilisateur : null;
  }

  private createForm() {

    const target = {
      nom: ['', [Validators.required]],
      type_animal: ['', [Validators.required]],
      race: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date_de_naissance: ['', []],
      photo_url: ['', []],
    };
    this.animalForm = this.formBuilder.group(target);
  }

  public createAnimal(): void {
    this.errorMessage = null;
    this.submitted = true;

    if (this.animalForm.invalid) {
      return;
    }

    const animal = new Animal();
    animal.nom = this.animalForm.controls.nom.value;
    animal.type_animal = this.animalForm.controls.type_animal.value;
    animal.race = this.animalForm.controls.race.value;
    animal.description = this.animalForm.controls.description.value;
    animal.date_de_naissance = this.animalForm.controls.date_de_naissance.value;
    animal.photo_url = this.animalForm.controls.photo_url.value;
    animal.utilisateur_id = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;

    console.log('Request to save animal %o', animal);

    this.dataService.animal(animal)
      .subscribe(data => {
        console.log("L'animal a été crée")
      }, error => {
        console.log("L'animal n'a pas pu être crée")
      });
  }
}
