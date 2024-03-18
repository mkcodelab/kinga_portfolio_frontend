import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'lightbox',
    template: `
        <!-- w-full h-full -->
        <div class="flex max-h-screen align-center p-10 w-fit">
            <img [src]="src" class="w-fit" />
        </div>
    `,
})
export class LightboxComponent {
    @Input() src = '';

    // @Output() close = new EventEmitter();

    // onClose() {
    //     this.close.emit();
    // }
}
