import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Sessao } from 'src/app/shared/models/sessao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/core/session.service';
import { ConfigPrams } from 'src/app/shared/models/config-prams';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface Salas {
  id: number;
  nome: string;
  qtdAssentos: number;
}


@Component({
  selector: 'dio-listagem-sessoes',
  templateUrl: './listagem-sessoes.component.html',
  styleUrls: ['./listagem-sessoes.component.scss']
})
export class ListagemSessoesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };

  sessoes: MatTableDataSource<Sessao> = new MatTableDataSource<Sessao>();


  displayedColumns: string[] = ['data', 'hora', 'valorIngresso', 'animacao', 'audio', 'filme', 'sala', 'id'];

  constructor(private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.listarSessoes()
    console.log(this.paginator)
  }
  ngAfterViewInit() {
    this.sessoes.paginator = this.paginator;
    console.log("aaa")
  }
  private listarSessoes(): void {
    this.config.pagina++;
    this.sessionService.listAll()
      .subscribe((sessao: Sessao[]) => {
        this.sessoes.data = sessao
        
      });
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/sessoes/' + id);
  }
}
