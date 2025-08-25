import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';

describe('search-input.component', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchTerm when onSearchChange is called', () => {
    const emitSpy = jest.spyOn(component.searchTerm, 'emit');
    component.searchInput = 'test';
    component.onSearchChange();
    expect(emitSpy).toHaveBeenCalledWith('test');
  });

  it('should emit empty string when searchInput is empty', () => {
    const emitSpy = jest.spyOn(component.searchTerm, 'emit');
    component.searchInput = '';
    component.onSearchChange();
    expect(emitSpy).toHaveBeenCalledWith('');
  });
});
