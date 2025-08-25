import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BankHeaderComponent } from '../../components/bank-header/bank-header.component';
import { ProductService } from '../../services/product.service';
import { AlertConfirmModalComponent } from '../../components/alert-confirm-modal/alert-confirm-modal.component';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../utils/custom.validator';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BankHeaderComponent,
    AlertConfirmModalComponent,
    CommonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  pageTitle: string = '';

  modalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private customValidators: CustomValidators
  ) {}

  ngOnInit(): void {
    this.setEditMode();
    this.buildForm();
    this.loadProductIfEditMode();
    this.subscribeToDateRelease();
  }

  setEditMode() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;
    this.pageTitle = this.isEditMode
      ? 'Formulario de Edición'
      : 'Formulario de Registro';
  }

  buildForm() {
    this.productForm = this.fb.group({
      id: [
        { value: '', disabled: this.isEditMode },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [this.customValidators.idAlreadyExists()],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: [
        '',
        [Validators.required, this.customValidators.dateMinValidator()],
      ],
      date_revision: [{ value: '', disabled: true }],
    });
  }

  loadProductIfEditMode() {
    if (this.isEditMode && this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.productForm.patchValue({
              id: product.id,
              name: product.name,
              description: product.description,
              logo: product.logo,
              date_release: product.date_release,
              date_revision: product.date_revision,
            });
          }
        },
        error: () =>
          this.showModalError(
            '¡Ups algo salio mal!',
            'No pudimos obtener la información del producto. Por favor, intenta nuevamente más tarde o recarga la página.'
          ),
      });
    }
  }

  subscribeToDateRelease() {
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe((date: string) => {
        if (date) {
          const release = new Date(date);
          const review = new Date(release);
          review.setFullYear(release.getFullYear() + 1);
          const formatted = review.toISOString().split('T')[0];
          this.productForm.get('date_revision')?.setValue(formatted);
        } else {
          this.productForm.get('date_revision')?.setValue('');
        }
      });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.getRawValue();
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formValue).subscribe({
        next: () => this.router.navigate(['/']),
        error: () =>
          this.showModalError(
            '¡Ups algo salio mal!',
            'No pudimos actualizar el producto. Por favor, intenta nuevamente más tarde.'
          ),
      });
    } else {
      this.productService.addProduct(formValue).subscribe({
        next: () => this.router.navigate(['/']),
        error: () =>
          this.showModalError(
            '¡Ups algo salio mal!',
            'No pudimos guardar el producto. Por favor, intenta nuevamente más tarde.'
          ),
      });
    }
  }

  onReset() {
    this.productForm.reset();
  }

  showModalError(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.modalOpen = true;
  }
}
