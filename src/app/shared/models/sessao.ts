import { Sala } from "src/app/listagem-salas/listagem-salas.component";
import { Filme } from "./filme";

export interface Sessao {
  id?: number,
  data?: string,
  hora?: string,
  valorIngresso?:number,
  tipoAnimacao?:string,
  tipoAudio?:string,
  filme:Filme,
  sala:Sala
}
  