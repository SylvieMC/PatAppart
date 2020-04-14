import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
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
  show: boolean = false;
  buttonName: any = 'Show';
  animals: Array<Animal> = [];

  utilisateurId = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

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
      return;
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

    this.dataService.animal(animal)
      .subscribe(data => {
        console.log("L'animal a été crée")
      }, error => {
        console.log("L'animal n'a pas pu être crée")
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

  public toggle(){
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)
      this.buttonName = "-";
    else
      this.buttonName = "+";
  }
}

