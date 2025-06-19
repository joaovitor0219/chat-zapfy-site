import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-mensagens',
  imports: [FormsModule, NgClass],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss',
  standalone: true
})
export class MensagensComponent implements OnInit {

  public request!: MensagemListarRequest;
  public response!: PaginacaoResponse<MensagemResponse>;
  private connection!: signalR.HubConnection;
  public mensagemForm!: FormGroup;
  public usuarioResponse!: UsuarioResponse;

  @Input() idUsuarioLogado!: number;
  @Input() idConversa!: number;

  constructor(private mensagensService: MensagensService,
    private builder: FormBuilder,
    private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.request = new MensagemListarRequest({});
    this.listarMensagens();
    this.iniciarSignalr();
  }

  iniciarFormulario() {
    this.mensagemForm = this.builder.group(MENSAGEM_FORM_CONFIG);
  }


  listarMensagens(): void {

    var request = new MensagemListarRequest({
      IdConversa: this.idConversa,
    })
    this.mensagensService.listarMensagens(request).subscribe({
      next: (response) => {
        this.response = response;
      },
      error: () => { }
    });
  }

  iniciarSignalr(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5128/api/chatHub')
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceberMensagem', (idUsuario: number, usuario: string, mensagem: string) => {
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
    const conteudo = this.mensagemForm.get('conteudo')?.value;

    if (conteudo?.trim()) {
      try {
        const usuario = await this.recuperarUsuarioPorId(this.idUsuarioLogado);

        await this.connection.invoke('EnviarMensagem', usuario.Id, usuario.Nome, conteudo);

        this.mensagemForm.get('conteudo')?.setValue('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  }

  private async recuperarUsuarioPorId(id: number): Promise<UsuarioResponse> {
    return await firstValueFrom(this.usuariosService.recuperarUsuarioPorId(id));
  }


}

