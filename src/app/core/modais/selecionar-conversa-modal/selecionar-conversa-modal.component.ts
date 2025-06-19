import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversasListarRequest } from '../../../conversas/models/requests/conversas-listagem.request';
import { ConversaResponse } from '../../../conversas/models/responses/conversas.response';
import { PaginacaoResponse } from '../../../shared/models/responses/paginacao.response';
import { ConversasService } from '../../../conversas/services/conversas.service';
import { CommonModule } from '@angular/common';
import { UsuarioResponse } from '../../../usuarios/models/responses/usuario.response';
import { ConversaPorUsuarioListarRequest } from '../../../conversas/models/requests/conversas-usuarios.request';
import { SELECIONAR_CONVERSA_FORM_CONFIG } from '../../../conversas/formularios/selecionar-conversa.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecionar-conversa-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './selecionar-conversa-modal.component.html',
  styleUrl: './selecionar-conversa-modal.component.scss',
  standalone: true
})
export class SelecionarConversaModalComponent implements OnInit {

  public selecionarConversaForm!: FormGroup;
  public listarConversaRequest!: ConversaPorUsuarioListarRequest;
  public conversasResponse!: ConversaResponse[];
  @Input() idUsuario!: number;
  @Output() conversaSelecionada = new EventEmitter<{ idUsuario: number, idConversa: number }>();
  @Output() fecharModal = new EventEmitter();

  constructor(private conversasService: ConversasService,
    private builder: FormBuilder,
    private readonly router: Router) {

  }

  ngOnInit(): void {
    this.selecionarConversaForm = this.builder.group(SELECIONAR_CONVERSA_FORM_CONFIG)
    this.listarConversas();
  }

  listarConversas(): void {

    const request = new ConversaPorUsuarioListarRequest({
      IdUsuario: this.idUsuario
    })

    this.conversasService.listarConversasPorUsuario(request).subscribe({
      next: (response) => {
        this.conversasResponse = response;
      },
      error: () => { }
    });
  }

  confirmarConversa(): void {
    const idConversa = this.selecionarConversaForm.get('IdConversa')?.value;
    const idUsuario = this.idUsuario;
    this.fecharModal.emit();

    if (idUsuario && idConversa) {
      sessionStorage.setItem('idUsuario', idUsuario.toString());
      sessionStorage.setItem('idConversa', idConversa.toString());  
      this.router.navigate(['/inicio'], {
        state: {
          idUsuario,
          idConversa
        }
      });
    }
  }

}
