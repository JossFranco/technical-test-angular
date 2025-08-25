import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  const mockProducts = [
    {
      id: 'test',
      name: 'Tarjeta de credito',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-01-01',
      date_revision: '2024-12-31',
    },
    {
      id: 'test1',
      name: 'Seguro de vida',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-01-01',
      date_revision: '2024-12-31',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
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

  it('should navigate to register form when add product its called', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    component.addProduct();
    expect(routerSpy).toHaveBeenCalledWith(['add']);
  });

  it('should filter products based on search term', () => {
    component.products = mockProducts;
    component.onSearchTermChange('tarjeta');
    expect(component.productsFiltered.length).toBe(1);
    expect(component.productsFiltered[0].name).toContain('Tarjeta de credito');
  });

  it('should return all products when search term is empty', () => {
    component.products = mockProducts;
    component.onSearchTermChange('');
    expect(component.productsFiltered.length).toBe(2);
  });

  it('should load products from product service', () => {
    jest
      .spyOn(component['productService'], 'getProducts')
      .mockReturnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.products).toEqual(mockProducts);
  });

  it('should modal error when product service fails', () => {
    jest
      .spyOn(component['productService'], 'getProducts')
      .mockReturnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.modalOpen).toBe(true);
    expect(component.modalTitle).toBe('¡Ups algo salio mal!');
    expect(component.modalContent).toBe(
      'No pudimos cargar los productos. Por favor, intenta nuevamente más tarde.'
    );
  });
});
