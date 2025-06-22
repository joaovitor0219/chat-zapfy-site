import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagemListarRequest } from '../models/requests/mensagem-listagem.request';
import { ConversasService } from '../../conversas/services/conversas.service';
import { MensagemResponse } from '../models/responses/mensagem.response';
import { MensagensService } from '../services/mensagens.service';
import { PaginacaoResponse } from '../../shared/models/responses/paginacao.response';
import { NgClass } from '@angular/common';
import * as signalR from '@microsoft/signalr';
import { MENSAGEM_FORM_CONFIG } from '../formularios/mensagem.form';
import { UsuariosService } from '../../usuarios/service/usuarios.service';
import { UsuarioResponse } from '../../usuarios/models/responses/usuario.response';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MensagemRequest } from '../models/requests/mensagem-request';


@Component({
  selector: 'app-mensagens',
  imports: [FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss',
  standalone: true
})
export class MensagensComponent implements OnInit, OnDestroy {

  public request!: MensagemListarRequest;
  public response!: PaginacaoResponse<MensagemResponse>;
  private connection!: signalR.HubConnection;
  public mensagemForm!: FormGroup;
  public usuarioResponse!: UsuarioResponse;

  public idUsuarioLogado!: number;
  public idConversa!: number;

  constructor(private mensagensService: MensagensService,
    private builder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.request = new MensagemListarRequest({});
    this.recuperarDadosRota();
  }

  ngOnDestroy(): void {
    if (this.connection) {
      this.connection.stop();
    }
  }


  iniciarFormulario() {
    this.mensagemForm = this.builder.group(MENSAGEM_FORM_CONFIG);
  }

  recuperarDadosRota(): void {
    const state = this.router.getCurrentNavigation()?.extras.state || history.state;

    this.idUsuarioLogado = state?.idUsuario ?? +sessionStorage.getItem('idUsuario')!;
    this.idConversa = state?.idConversa ?? +sessionStorage.getItem('idConversa')!;

    if (!this.idUsuarioLogado || !this.idConversa) {
      this.router.navigate(['/login']);
      return;
    }

    this.listarMensagens();
    this.iniciarSignalr();
  }


  listarMensagens(): void {

    this.request.IdConversa = this.idConversa;
    this.mensagensService.listarMensagens(this.request).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: () => { }
    });
  }

  iniciarSignalr(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5128/api/chatHub', {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceberMensagem', (idUsuario: number, usuario: string, mensagem: string) => {

      if (!this.response?.Registros) {
        this.response = {
          Total: 0,
          Registros: []
        };
      }

      this.response.Registros = [
        ...this.response.Registros,
        {
          Conteudo: mensagem,
          Usuario: { Id: idUsuario, Nome: usuario }
        }
      ];
    });

    this.connection.start().then(() => console.log('Conectado ao Signalr')
    ).catch(err => console.error('Erro ao conectar', err));

  }

  async enviarMensagem(): Promise<void> {
    const conteudo = this.mensagemForm.get('Conteudo')?.value;

    if (conteudo?.trim()) {
      try {
        const usuario = await this.recuperarUsuarioPorId(this.idUsuarioLogado);

        await this.connection.invoke('EnviarMensagem', usuario.Id, usuario.Nome, conteudo);

        this.publicarMensagemNaFilaAws(usuario.Id!, conteudo)

        this.mensagemForm.get('Conteudo')?.setValue('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  }

  private async recuperarUsuarioPorId(id: number): Promise<UsuarioResponse> {
    return await firstValueFrom(this.usuariosService.recuperarUsuarioPorId(id));
  }

  private publicarMensagemNaFilaAws(idUsuario: number, conteudo: string,): void{
    const request = new MensagemRequest({
      IdUsuario: idUsuario,
      Conteudo: conteudo,
      IdConversa: this.idConversa
    });

    this.mensagensService.publicarMensagemAws(request).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  conteudoFormControl(): FormControl {
    return this.mensagemForm.get('Conteudo') as FormControl;
  }


}

