import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { BankHeaderComponent } from '../../components/bank-header/bank-header.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductActionMenuComponent } from '../../components/product-action-menu/product-action-menu.component';
import { AlertConfirmModalComponent } from '../../components/alert-confirm-modal/alert-confirm-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    BankHeaderComponent,
    SearchInputComponent,
    ProductActionMenuComponent,
    AlertConfirmModalComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  productsFiltered: Product[] = [];
  isMenuOpen: boolean = false;
  itemsPerPage: number = 5;

  modalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();

    this.productService.productsUpdated$.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.productsFiltered = data;
      },
      error: () => {
        this.modalTitle = '¡Ups algo salio mal!';
        this.modalContent =
          'No pudimos cargar los productos. Por favor, intenta nuevamente más tarde.';
        this.modalOpen = true;
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  addProduct() {
    this.router.navigate(['add']);
  }

  onSearchTermChange(searchTerm: string) {
    if (searchTerm) {
      this.productsFiltered = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.productsFiltered = [...this.products];
    }
  }
}
