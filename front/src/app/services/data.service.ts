import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/model.utilisateur';
import { Connexion } from '../model/model.connexion';
import { Animal } from '../model/model.animal';
import { Logement } from '../model/model.logement';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private resourceUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  public getAllLogements(): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(this.resourceUrl + '/logements', { observe: 'response' });
  }

  public getAllUtilisateurs(): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(this.resourceUrl + '/utilisateurs', { observe: 'response' });
  }

  public getAllAnimals(): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(this.resourceUrl + '/animals', { observe: 'response' });
  }

  public createLogement(logement: Logement): Observable<HttpResponse<Object>> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('token', token);

    return this.http.post<HttpResponse<Object>>(
      this.resourceUrl + '/logements', logement,
      { headers: headers, observe: 'response' });
  }

  public createUtilisateur(utilisateur: Utilisateur): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(
      this.resourceUrl + '/utilisateurs', utilisateur,
      { observe: 'response' });
  }

  public updateUtilisateur(utilisateur: Utilisateur): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(
      this.resourceUrl + '/utilisateurs', utilisateur,
      { observe: 'response' });
  }

   public getUtilisateurById(utilisateurId: number): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(
      this.resourceUrl + '/utilisateurs/' + utilisateurId,
      { observe: 'response' });
   }

   public connexion(connexion: Connexion): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(
      this.resourceUrl + '/utilisateurs/connexion', connexion,
      { observe: 'response' });
   }

   public createAnimal(animal: Animal): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(
      this.resourceUrl + '/animals', animal,
      { observe: 'response' });
   }

   public updateAnimal(animal: Animal): Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(
      this.resourceUrl + '/animals', animal,
      { observe: 'response' });
   }

   public getAnimalById(animalId: number): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(
      this.resourceUrl + '/animals/' + animalId,
      { observe: 'response' });
   }

   public deleteAnimalById(animalId: number): Observable<HttpResponse<Object>> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('token', token);

    return this.http.delete<HttpResponse<Object>>(
      this.resourceUrl + '/animals/' + animalId,
      { headers: headers, observe: 'response' });
   }

   private getToken() : string {
    return JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')).token : null;
   }

}
