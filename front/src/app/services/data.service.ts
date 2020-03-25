import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/model.utilisateur';

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
  public createUtilisateur(utilisateur: Utilisateur): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(
        this.resourceUrl + '/utilisateurs', utilisateur,
        { observe: 'response' });
}
}
