import { Component } from '@angular/core';
import { PessoasListComponent } from './components/pessoas-list/pessoas-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PessoasListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pessoas App';
}