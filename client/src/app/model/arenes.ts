export interface arene {
  id: number;
  nom: string;
  description: string;
  lat: number;
  long: number;
  joueurActif: number | null;
  dateCapture: Date;
}
