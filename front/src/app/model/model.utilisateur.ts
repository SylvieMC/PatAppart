export class Utilisateur {
  constructor(
      public id?: number,
      public login?: string,
      public mot_de_passe?: string,
      public email?: string,
      public description?: string,
      public date_de_naissance?: Date,
  ) {}
}
