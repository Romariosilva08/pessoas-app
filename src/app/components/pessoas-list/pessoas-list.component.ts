import { Component, OnInit } from '@angular/core'; 
import { Pessoa, PessoaService } from '../../services/pessoa.service'; 
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-pessoas-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.css']
})
export class PessoasListComponent implements OnInit {
  displayedColumns: string[] = ['cpf', 'nome', 'genero', 'endereco', 'idade', 'municipio', 'estado'];
  pessoas: Pessoa[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  filtroNome = '';
  isLoading = false;
  private searchSubject = new Subject<string>();

  constructor(private pessoaService: PessoaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadPessoas();
    
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.aplicarFiltro();
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.filtroNome);
  }

  loadPessoas() {
    this.isLoading = true;
    const page = this.pageIndex + 1;

    this.pessoaService.getPessoas(page, this.pageSize, this.filtroNome).subscribe({
      next: (response) => {
        this.pessoas = response.items;
        this.totalItems = response.totalRecords;
        this.isLoading = false;

        this.snackBar.open('Pessoas carregadas com sucesso!', 'Fechar', { duration: 3000 });

      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        this.isLoading = false;

        this.snackBar.open('Erro ao carregar as pessoas. Tente novamente.', 'Fechar', { duration: 3000 });

      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadPessoas();
  }

  aplicarFiltro() {
    this.pageIndex = 0;
    this.loadPessoas();
  }

  limparFiltro() {
    this.filtroNome = '';
    this.aplicarFiltro();
  }
}