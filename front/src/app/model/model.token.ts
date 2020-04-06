import { Utilisateur } from './model.utilisateur';

export class Token   {
  constructor(
      public token?: string,
      public utilisateur ?: Utilisateur
  ) {}
}
