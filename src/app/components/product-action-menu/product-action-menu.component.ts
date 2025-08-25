import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertConfirmModalComponent } from '../alert-confirm-modal/alert-confirm-modal.component';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-action-menu',
  standalone: true,
  imports: [AlertConfirmModalComponent],
  templateUrl: './product-action-menu.component.html',
  styleUrl: './product-action-menu.component.scss'
})
export class ProductActionMenuComponent {

  @Input() product?: Product;

  isMenuOpen: boolean = false;

  modalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  modalFooter: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editProduct() {
    this.router.navigate([`edit/${this.product?.id}`]);
  }

  deleteProduct() {
    this.isMenuOpen = false;
    this.modalFooter = true;
    this.modalTitle = "Confirmar eliminación";
    this.modalContent = `¿Estás seguro de que deseas eliminar el producto ${this.product?.name}?`;
    this.modalOpen = true;
  }

  onDeleteConfirm() {
    this.modalOpen = false;
    this.productService.deleteProduct(this.product!.id).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: () => {
        this.modalTitle = "¡Ups algo salio mal!";
        this.modalContent = "No pudimos eliminar el producto. Por favor, intenta nuevamente más tarde.";
        this.modalFooter = false;
        this.modalOpen = true;
      },
    });
  }
  onCancel() {
    this.modalOpen = false;
  }
}
