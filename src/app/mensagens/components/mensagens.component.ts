import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensagens',
  imports: [FormsModule],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss',
  standalone: true
})
export class MensagensComponent {


  newMessage = '';
  isTyping = false;
  typingUser = 'Suporte';
  
}

interface Message {
  content: string;
  isUser: boolean;
  sender: string;
  time: string;
}
