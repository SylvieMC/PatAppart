import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Utilisateur } from '../model/model.utilisateur';
import { Animal } from '../model/model.animal';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  animals: Array<Animal> = [];
  photo = 'https://patappart.sylvie-cassim.com/assets/img/default.jpg';
  utilisateurId = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCompteUtilisateur();
    this.createForm();
    this.getAllAnimal();
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
      this._snackBar.open('Votre animal de compagnie n\'a pas pu être ajouté.', '', {
        duration: 2000,
      });
    }

    const animal = new Animal();
    animal.nom = this.animalForm.controls.nom.value;
    animal.type_animal = this.animalForm.controls.type_animal.value;
    animal.race = this.animalForm.controls.race.value;
    animal.description = this.animalForm.controls.description.value;
    animal.date_de_naissance = this.animalForm.controls.date_de_naissance.value;
    animal.photo_url = this.animalForm.controls.photo_url.value;
    animal.utilisateur_id = this.utilisateurId;

    console.log('Request to save animal %o', animal);

    this.dataService.createAnimal(animal)
      .subscribe(data => {
        this._snackBar.open('Votre animal de compagnie a été ajouté!', '', {
          duration: 2000,
        });
      }, error => {
        this._snackBar.open('Votre animal de compagnie n\'a pas pu être ajouté.', '', {
          duration: 2000,
        });
      });

  }

  private getAllAnimal(): void {

      this.dataService.getAllAnimals()
          .subscribe(response => {
         this.animals = this.findAnimalsByUtilisateurId(this.utilisateurId, response.body as Array<Animal>);
       console.table(this.animals);
    }, error => {
      console.log('Error during get animals', error);
    })

  }

  private findAnimalsByUtilisateurId(utilisateurId: number, animals: Array<Animal>): Array<Animal> {

      return animals.filter(animal => animal.utilisateur_id === utilisateurId);

  }

  public deleteAnimalById(animalId: number): void {

    this.dataService.deleteAnimalById(animalId)
    .subscribe(animalResponse => {
      console.log(animalResponse);
      this._snackBar.open('Vous avez bien supprimé votre animal de compagnie de votre profil.', '', {
        duration: 2000,
      });
    }, error => {
      console.error(error);
    });

  }

}

