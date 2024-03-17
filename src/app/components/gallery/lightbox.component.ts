import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'lightbox',
    template: `<div
        class="w-full h-full flex justify-center"
        (click)="onClose()"
    >
        <img [src]="src" />
    </div>`,
})
export class LightboxComponent {
    @Input() src = '';

    @Output() close = new EventEmitter();

    onClose() {
        this.close.emit();
    }
}
