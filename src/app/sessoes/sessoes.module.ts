import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemSessoesComponent } from './listagem-sessoes/listagem-sessoes.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamposModule } from '../shared/components/campos/campos.module';
import { CadastroSessoesComponent } from './cadastro-sessoes/cadastro-sessoes.component';
import { VerSessaoComponent } from './ver-sessao/ver-sessao.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule
  ],
  declarations: [ ListagemSessoesComponent, CadastroSessoesComponent, VerSessaoComponent]
})
export class SessoesModule { }
