import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesModule } from './filmes/filmes.module';
import { CadastroFilmesComponent } from './filmes/cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './filmes/listagem-filmes/listagem-filmes.component';
import { VisualizarFilmesComponent } from './filmes/visualizar-filmes/visualizar-filmes.component';
import { ListagemSalasComponent } from './listagem-salas/listagem-salas.component';
import { ListagemSessoesComponent } from './sessoes/listagem-sessoes/listagem-sessoes.component';
import { SessoesModule } from './sessoes/sessoes.module';
import { CadastroSessoesComponent } from './sessoes/cadastro-sessoes/cadastro-sessoes.component';
import { VerSessaoComponent } from './sessoes/ver-sessao/ver-sessao.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'filmes',
      pathMatch: 'full'
  },
  {
    path: 'salas',
    component: ListagemSalasComponent
  },
  {
    path: 'sessoes',
    children:[
      {
        path:'',
        component: ListagemSessoesComponent
      },
      {
        path:'cadastro',
        children: [
          {
            path:'',
            component: CadastroSessoesComponent
          },
          {
            path: ':id',
            component: CadastroSessoesComponent
          }

        ]
      },
      {
        path: ':id',
        component: VerSessaoComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'filmes',
    children: [
      {
        path: '',
        component: ListagemFilmesComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroFilmesComponent
          },
          {
            path: ':id',
            component: CadastroFilmesComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarFilmesComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'filmes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FilmesModule,
    SessoesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
