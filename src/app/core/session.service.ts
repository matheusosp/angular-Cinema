import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sessao } from '../shared/models/sessao';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { Sala } from '../listagem-salas/listagem-salas.component';

const url = 'http://127.0.0.1/sessoes/';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    constructor(private http: HttpClient,
      private configService: ConfigParamsService) { }

    salvar(sessao: Sessao): Observable<Sessao> {
      return this.http.post<Sessao>(url, sessao);
    }

    editar(sessao: Sessao): Observable<Sessao> {
      return this.http.put<Sessao>(url + sessao.id, sessao);
    }

    listar(config: ConfigPrams): Observable<Sessao[]> {
      const configPrams = this.configService.configurarParametros(config);
      var cfg = configPrams.toString().replace("&",'/');
      return this.http.get<Sessao[]>(url + cfg);
    }

    listAll(): Observable<Sessao[]> {
      return this.http.get<Sessao[]>(url);
    }

    visualizar(id: number): Observable<Sessao> {
    return this.http.get<Sessao>(url + id);
    }

    excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
    } 

    findSala(sala: Sala): Observable<Sala> {
      return this.http.get<Sala>(url + '/sala/search='+sala)
    }  
}
