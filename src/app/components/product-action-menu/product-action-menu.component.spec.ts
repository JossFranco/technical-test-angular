
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductActionMenuComponent } from './product-action-menu.component';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ProductActionMenuComponent', () => {
  let component: ProductActionMenuComponent;
  let fixture: ComponentFixture<ProductActionMenuComponent>;
  const mockProduct = {
    id: 'test',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'test-logo.png',
    date_release: '2024-01-01',
    date_revision: '2024-12-31'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductActionMenuComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu', () => {
    component.isMenuOpen = false;
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('should close the modal on cancel', () => {
    component.modalOpen = true;
    component.onCancel();
    expect(component.modalOpen).toBe(false);
  });

  it('should navigate to edit product', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    component.product = mockProduct;
    component.editProduct();

    expect(routerSpy).toHaveBeenCalledWith([`edit/${component.product?.id}`]);
  });

  it('should open delete modal', () => {
    component.product = mockProduct;
    component.toggleMenu();

    expect(component.isMenuOpen).toBe(true);
    expect(component.modalOpen).toBe(false);

    component.deleteProduct();

    expect(component.isMenuOpen).toBe(false);
    expect(component.modalOpen).toBe(true);
    expect(component.modalTitle).toBe("Confirmar eliminación");
    expect(component.modalContent).toBe(`¿Estás seguro de que deseas eliminar el producto ${component.product?.name}?`);
  });

  it('should close modal when onCancel its called', () => {
    component.modalOpen = true;
    component.onCancel();
    expect(component.modalOpen).toBe(false);
  });

  it('should navigate when delete product its successful', () => {
    component.product = mockProduct;
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['productService'], 'deleteProduct').mockReturnValue(of({}));
    component.onDeleteConfirm();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should show error modal when delete product fails', () => {
    component.product = mockProduct;
    jest.spyOn(component['productService'], 'deleteProduct').mockReturnValue(throwError(() => new Error('Error')));
    component.onDeleteConfirm();
    expect(component.modalTitle).toBe("¡Ups algo salio mal!");
    expect(component.modalContent).toBe("No pudimos eliminar el producto. Por favor, intenta nuevamente más tarde.");
    expect(component.modalFooter).toBe(false);
    expect(component.modalOpen).toBe(true);
  });
});
