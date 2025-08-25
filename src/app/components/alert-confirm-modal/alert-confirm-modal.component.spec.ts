import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertConfirmModalComponent } from './alert-confirm-modal.component';

describe('AlertConfirmModalComponent', () => {
  let component: AlertConfirmModalComponent;
  let fixture: ComponentFixture<AlertConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when confirmed', () => {
    const confirmSpy = jest.spyOn(component.confirmClick, 'emit');
    component.confirm();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should emit event when close', () => {
    const closeSpy = jest.spyOn(component.cancelClick, 'emit');
    component.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});
