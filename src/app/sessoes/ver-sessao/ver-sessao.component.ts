import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/core/session.service';
import { Sessao } from 'src/app/shared/models/sessao';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';


@Component({
  selector: 'dio-ver-sessao',
  templateUrl: './ver-sessao.component.html',
  styleUrls: ['./ver-sessao.component.scss']
})
export class VerSessaoComponent implements OnInit {

  sessao: Sessao;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sessaoService: SessionService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/sessoes/cadastro/' + this.id); 
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.sessaoService.excluir(this.id)
        .subscribe(() => {
          const config = {
            data: {
              descricao: 'Seu registro foi deletado com sucesso!',
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
        }
        );
      }
    });
  }

  private visualizar(): void {
    this.sessaoService.visualizar(this.id).subscribe((sessao: Sessao) => this.sessao = sessao);
  }

}
