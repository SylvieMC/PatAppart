import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { forkJoin } from 'rxjs';
import { Utilisateur } from '../model/model.utilisateur';
import { Animal } from '../model/model.animal';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  utilisateur: Utilisateur;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCompteUtilisateur();
  }
  private getCompteUtilisateur(): void{
    this.utilisateur = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')).utilisateur : null;

  }


}
