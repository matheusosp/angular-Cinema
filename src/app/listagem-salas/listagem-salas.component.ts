import { Component, OnInit } from '@angular/core';

export interface Sala {
  id?: number;
  nome?: string;
  qtdAssentos?: number;
}

const ELEMENT_DATA: Sala[] = [
  {id: 1, nome: 'Sala 1', qtdAssentos: 40 },
  {id: 2, nome: 'Sala 2', qtdAssentos: 50 },
  {id: 3, nome: 'Sala 3', qtdAssentos: 60 },
];

@Component({
  selector: 'listagem-salas',
  templateUrl: './listagem-salas.component.html',
  styleUrls: ['./listagem-salas.component.scss']
})


export class ListagemSalasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'qtdAssentos'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit() {
  }

}
