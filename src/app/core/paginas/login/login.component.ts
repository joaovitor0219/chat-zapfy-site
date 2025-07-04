import { Component, inject, OnInit, Renderer2, RendererFactory2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOGIN_FORM_CONFIG } from './formularios/login.form';
import { ConversasService } from '../../../conversas/services/conversas.service';
import { ConversasListarRequest } from '../../../conversas/models/requests/conversas-listagem.request';
import { PaginacaoResponse } from '../../../shared/models/responses/paginacao.response';
import { ConversaResponse } from '../../../conversas/models/responses/conversas.response';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { SelecionarConversaModalComponent } from '../../modais/selecionar-conversa-modal/selecionar-conversa-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosService } from '../../../usuarios/service/usuarios.service';
import { UsuarioResponse } from '../../../usuarios/models/responses/usuario.response';
import { UsuarioLoginRequest } from '../../../usuarios/models/requests/usuario-login.request';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ModalModule,
    SelecionarConversaModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public listarConversaRequest!: ConversasListarRequest;
  public conversasResponse!: PaginacaoResponse<ConversaResponse>;
  public modalRef!: BsModalRef;
  public usuarioResponse!: UsuarioResponse;
  public usuarioLoginRequest!: UsuarioLoginRequest;

  conversaSelecionada: string | null = null;

  conversas = [
    { id: '1', nome: 'Chat com Diogo' },
    { id: '2', nome: 'Grupo de Devs' }
  ];

  @ViewChild('modalSelecionarConversa', { static: true }) modalSelecionarConversa!: TemplateRef<any>;

  constructor(private builder: FormBuilder,
    private conversasService: ConversasService,
    private modalService: BsModalService,
    private usuariosService: UsuariosService) { 

    }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarConversaRequest = new ConversasListarRequest({});

  }


  entrar() {
    this.abrirModalSelecionarConversa();
  }

  iniciarFormulario() {
    this.loginForm = this.builder.group(LOGIN_FORM_CONFIG);
  }

  listarConversas(): void {
    this.conversasService.listarConversas(this.listarConversaRequest).subscribe({
      next: (response) => {
        this.conversasResponse = response;
      },
      error: () => { }
    });
  }

  recuperarUsuarioLogin(): void{
    const nome = this.loginForm.get('Nome')?.value;
    const senha = this.loginForm.get('Senha')?.value;

    const request = new UsuarioLoginRequest({
      Nome: nome,
      Senha: senha
    });

    this.usuariosService.recuperarUsuarioLogin(request).subscribe({
      next: (response) => {
        this.usuarioResponse = response;
      },
      error: () => {}
    });

  }

  abrirModalSelecionarConversa(): void {

    this.modalRef = this.modalService.show(this.modalSelecionarConversa, {
      class: "modal-md modal-drawer fade-right",
    });
  }

  fecharModal(): void {
    this.modalRef.hide();
  }

}
