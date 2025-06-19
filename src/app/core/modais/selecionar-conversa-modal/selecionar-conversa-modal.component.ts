import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversasListarRequest } from '../../../conversas/models/requests/conversas-listagem.request';
import { ConversaResponse } from '../../../conversas/models/responses/conversas.response';
import { PaginacaoResponse } from '../../../shared/models/responses/paginacao.response';
import { ConversasService } from '../../../conversas/services/conversas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selecionar-conversa-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './selecionar-conversa-modal.component.html',
  styleUrl: './selecionar-conversa-modal.component.scss',
  standalone: true
})
export class SelecionarConversaModalComponent implements OnInit {
  
  public selecionarConversaForm!: FormGroup;
  public listarConversaRequest!: ConversasListarRequest;
  public conversasResponse!: PaginacaoResponse<ConversaResponse>;
  @Input() idUsuario!:number; 

  conversas = [
    { id: '1', nome: 'Chat com Diogo' },
    { id: '2', nome: 'Grupo de Devs' }
  ];
  
  constructor(private conversasService: ConversasService) {
    
  }

  ngOnInit(): void {
    // this.iniciarFormulario();
    this.listarConversaRequest = new ConversasListarRequest({});
  }

  listarConversas(): void{
    this.conversasService.listarConversas(this.listarConversaRequest).subscribe({
      next:(response) => {
        this.conversasResponse = response;
      },
      error: () => {}
    });
  }

  confirmarConversa(){}

}
