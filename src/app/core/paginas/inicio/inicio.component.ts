import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagensComponent } from '../../../mensagens/mensagens.component';
import { ConversasComponent } from '../../../conversas/conversas.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConversasComponent,
    MensagensComponent
  ],
})
export class InicioComponent {

}
