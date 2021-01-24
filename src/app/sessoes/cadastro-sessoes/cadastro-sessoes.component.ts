import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Sessao } from 'src/app/shared/models/sessao';
import { SessionService } from 'src/app/core/session.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { Sala } from 'src/app/listagem-salas/listagem-salas.component';


@Component({
  selector: 'dio-cadastro-sessoes',
  templateUrl: './cadastro-sessoes.component.html',
  styleUrls: ['./cadastro-sessoes.component.scss']
})
export class CadastroSessoesComponent implements OnInit {
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};

  id: number;
  cadastro: FormGroup;
  animacoes: Array<string> = ['2D','3D'];
  audio: Array<string> = ['DUBLADO','ORIGINAL'];
  filmesTitulo: Array<string | undefined> = [];
  salas: Array<string> = ['Sala 1','Sala 2', 'Sala 3'];

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private sessaoService: SessionService,
              private filmeService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.sessaoService.visualizar(this.id)
        .subscribe((sessao: Sessao) => this.criarFormulario(sessao));
    } else {
      this.criarFormulario(this.criarSessaoEmBranco());
    }


    this.filmeService.listAll()
      .subscribe((filme: Filme[]) => filme.forEach((filme:Filme) => this.filmesTitulo.push(filme.titulo)));

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    let sessao = this.cadastro.getRawValue() as Sessao;
    this.filmeService.findByTitulo(sessao.filme).subscribe((filme: Filme) => {
      sessao.filme = filme
      sessao.hora = (new Date(2000,10,5,this.time.hour, this.time.minute, 0, 0).toString())
      this.sessaoService.findSala(sessao.sala).subscribe((sala: Sala) =>{  
        sessao.data = sessao.data?.toString();      
        sessao.sala= sala;
        if (this.id) {
          sessao.id = this.id;
          this.editar(sessao);
        } else {
          this.salvar(sessao);
        }
      })
    })

  }
  private salvar(sessao: Sessao): void {
    this.sessaoService.salvar(sessao).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um nova sessao',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('sessoes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    (err) => {
      let desc: string = err.error.message;
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: desc,
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }


  reiniciarForm(): void {
    this.cadastro.reset();
  }


  private criarFormulario(sessao: Sessao): void {
    this.cadastro = this.fb.group({
      data: [sessao.data, [Validators.required]],
      hora: [new Date(2000,10,5,this.time.hour, this.time.minute, 0, 0).toString()],
      valorIngresso: [sessao.valorIngresso, [Validators.required, Validators.min(0), Validators.max(100)]],
      tipoAnimacao: [sessao.tipoAnimacao, [Validators.required]],
      tipoAudio: [sessao.tipoAudio, [Validators.required]],
      filme: [sessao.filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      sala: [sessao.sala.nome, [Validators.required]],
    });
  }
                                                                                                                                                                               

  private criarSessaoEmBranco(): Sessao {
    return {
      id: undefined,
      data: undefined,
      hora: undefined,
      valorIngresso:undefined,
      tipoAnimacao:undefined,
      tipoAudio:undefined,
      filme:{undefined},
      sala:{undefined}
    } as Sessao;
  }

  

  private editar(sessao: Sessao): void {
    this.sessaoService.editar(sessao).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('sessoes'));
    },
    (err) => {
      let desc: string = err.error.message;
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: desc,
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
