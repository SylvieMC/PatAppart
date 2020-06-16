import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Utilisateur } from '../model/model.utilisateur';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprofil',
  templateUrl: './editprofil.component.html',
  styleUrls: ['./editprofil.component.scss']
})
export class EditprofilComponent implements OnInit {
  profilEditForm: FormGroup;
  errorMessage: string;
  submitted = false;
  utilisateurId: number;
  utilisateur: Utilisateur;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute
    ) {
     this.route.queryParams.subscribe(params => {
       this.utilisateurId = params['id'];

   });
  }

  ngOnInit(): void {
    this.createForm();
    this.getUtilisateurById(this.utilisateurId);
  }

  private createForm() {

    const target = {
      login: ['', [Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      email: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date_de_naissance: ['', [Validators.required]]
    };
    this.profilEditForm = this.formBuilder.group(target);
  }

  public editProfil(): void {
    this.errorMessage = null;
    this.submitted = true;

    if (this.profilEditForm.invalid) {
      return;
    }

    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilisateurId;
    utilisateur.login = this.profilEditForm.controls.login.value;
    utilisateur.mot_de_passe = this.profilEditForm.controls.mot_de_passe.value;
    utilisateur.email = this.profilEditForm.controls.email.value;
    utilisateur.description = this.profilEditForm.controls.description.value;
    utilisateur.date_de_naissance = this.profilEditForm.controls.date_de_naissance.value;

    console.log('Request to save utilisateur %o', utilisateur);

    this.dataService.updateUtilisateur(utilisateur)
      .subscribe(data => {
        console.log("L'utilisateur à été édité")
      }, error => {
        console.log("L'utilisateur n'a pas pu être édité")
      });
  }

  private getUtilisateurById(utilisateurId: number): void {
    this.dataService.getUtilisateurById(this.utilisateurId)
    .subscribe(utilisateurResponse => {
       this.utilisateur = utilisateurResponse.body as Utilisateur;
       this.profilEditForm.controls.login.setValue(this.utilisateur.login);
       this.profilEditForm.controls.mot_de_passe.setValue(this.utilisateur.mot_de_passe);
       this.profilEditForm.controls.email.setValue(this.utilisateur.email);
       this.profilEditForm.controls.description.setValue(this.utilisateur.description);
       this.profilEditForm.controls.date_de_naissance.setValue(this.utilisateur.date_de_naissance);
    }, error => {
      console.error(error);
    });
}
}
