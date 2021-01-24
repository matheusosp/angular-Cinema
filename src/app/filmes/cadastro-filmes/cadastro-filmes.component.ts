import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

  }

  submit(): void {
    
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }

  }
  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('filmes');
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


  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlImagem: [filme.urlImagem, [Validators.minLength(10)]],
      descricao: [filme.descricao],
      duracao: [filme.duracao, [Validators.required, Validators.min(0), Validators.max(1000)]],
    });
  }


  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: "",
      urlImagem: "",
      descricao: "",
      duracao: null
    } as Filme;
  }

  

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
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
