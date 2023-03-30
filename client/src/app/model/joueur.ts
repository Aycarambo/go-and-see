export interface joueur {
  id: number;
  login: string;
  password?: string;
  points?: number;
  credits?: number;
  lat?: number;
  long?: number;
  avatar?: any;
  classement?: number;
}
