import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagensComponent } from '../../../mensagens/components/mensagens.component';
import { ConversasComponent } from '../../../conversas/conversas.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
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
