import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Animal } from '../model/model.animal';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editanimal',
  templateUrl: './editanimal.component.html',
  styleUrls: ['./editanimal.component.scss']

})
export class EditanimalComponent implements OnInit {
  animalEditForm: FormGroup;
  errorMessage: string;
  submitted = false;

  utilisateurId = JSON.parse(localStorage.getItem('utilisateur')).utilisateur.id;
  animalId: number;
  animal: Animal;


  constructor(
    private formBuilder: FormBuilder,
     private dataService: DataService,
     private route: ActivatedRoute
     ) {
      this.route.queryParams.subscribe(params => {
        this.animalId = params['id'];

    });
     }

  ngOnInit(): void {
    this.createForm();
    this.getAnimalById(this.animalId);
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
    this.animalEditForm = this.formBuilder.group(target);
  }
  public editAnimal(): void {
    this.errorMessage = null;
    this.submitted = true;

    if (this.animalEditForm.invalid) {
      return;
    }

    const animal = new Animal();
    animal.id  = this.animalId;
    animal.nom = this.animalEditForm.controls.nom.value;
    animal.type_animal = this.animalEditForm.controls.type_animal.value;
    animal.race = this.animalEditForm.controls.race.value;
    animal.description = this.animalEditForm.controls.description.value;
    animal.date_de_naissance = this.animalEditForm.controls.date_de_naissance.value;
    animal.photo_url = this.animalEditForm.controls.photo_url.value;
    animal.utilisateur_id = this.utilisateurId;

    console.log('Request to save animal %o', animal);

    this.dataService.updateAnimal(animal)
      .subscribe(data => {
        console.log("L'animal a été édité")
      }, error => {
        console.log("L'animal n'a pas pu être édité")
      });
  }

  private getAnimalById(animalId: number): void {
      this.dataService.getAnimalById(animalId)
      .subscribe(animalResponse => {
         this.animal = animalResponse.body as Animal;
         this.animalEditForm.controls.nom.setValue(this.animal.nom);
         this.animalEditForm.controls.type_animal.setValue(this.animal.type_animal);
         this.animalEditForm.controls.race.setValue(this.animal.race);
         this.animalEditForm.controls.description.setValue(this.animal.description);
         this.animalEditForm.controls.date_de_naissance.setValue(this.animal.date_de_naissance);
         this.animalEditForm.controls.photo_url.setValue(this.animal.photo_url);
      }, error => {
        console.error(error);
      });
  }

}
