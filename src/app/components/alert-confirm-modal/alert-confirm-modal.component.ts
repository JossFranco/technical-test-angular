import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-alert-confirm',
  standalone: true,
  imports: [],
  templateUrl: './alert-confirm-modal.component.html',
  styleUrl: './alert-confirm-modal.component.scss',
})
export class AlertConfirmModalComponent {
  @Input() open: boolean = true;
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() showFooter: boolean = false;
  @Output() confirmClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.open && !this.eRef.nativeElement.querySelector('.modal-content')?.contains(event.target as Node)) {
      this.close();
    }
  }

  confirm() {
    this.confirmClick.emit();
  }

  close() {
    this.open = false;
    this.cancelClick.emit();
  }
}
