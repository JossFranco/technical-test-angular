import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Output() searchTerm = new EventEmitter<string>();

  searchInput: string = '';

  onSearchChange() {
    this.searchTerm.emit(this.searchInput);
  }
}
