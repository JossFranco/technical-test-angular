import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn(),
      },
    },
  };
  const mockProduct = {
    id: 'test',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'test-logo.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when onReset is called', () => {
    component.productForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'A description for testing',
      logo: 'logo.png',
      date_release: '2024-06-01',
      date_revision: '2025-06-01',
    });

    component.onReset();

    expect(component.productForm.get('id')?.value).toBe(null);
    expect(component.productForm.get('name')?.value).toBe(null);
    expect(component.productForm.get('description')?.value).toBe(null);
    expect(component.productForm.get('logo')?.value).toBe(null);
    expect(component.productForm.get('date_release')?.value).toBe(null);
    expect(component.productForm.get('date_revision')?.value).toBe(null);
  });

  it('should set modal properties and open modal when showModalError is called', () => {
    const title = 'Error Title';
    const content = 'Error Content';
    component.modalOpen = false;
    component.modalTitle = '';
    component.modalContent = '';

    component.showModalError(title, content);

    expect(component.modalOpen).toBe(true);
    expect(component.modalTitle).toBe(title);
    expect(component.modalContent).toBe(content);
  });

  it('should mark all as touched and not submit if form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(
      component.productForm,
      'markAllAsTouched'
    );
    const updateProductSpy = jest.spyOn(
      component['productService'],
      'updateProduct'
    );
    const addProductSpy = jest.spyOn(component['productService'], 'addProduct');

    component.productForm.setErrors({ invalid: true });
    component.onSubmit();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(updateProductSpy).not.toHaveBeenCalled();
    expect(addProductSpy).not.toHaveBeenCalled();
  });

  it('should load product info when is edit mode', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('123');
    jest
      .spyOn(component['productService'], 'getProductById')
      .mockReturnValue(of(mockProduct));
    component.ngOnInit();
    expect(component.productForm.get('name')?.value).toBe(mockProduct.name);
  });

  it('should show modal error if getProductById fails in loadProductIfEditMode', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('123');
    jest
      .spyOn(component['productService'], 'getProductById')
      .mockReturnValue(throwError('Error'));
    const showModalErrorSpy = jest.spyOn(component, 'showModalError');
    component.ngOnInit();
    expect(showModalErrorSpy).toHaveBeenCalledWith(
      '¡Ups algo salio mal!',
      'No pudimos obtener la información del producto. Por favor, intenta nuevamente más tarde o recarga la página.'
    );
  });
});
