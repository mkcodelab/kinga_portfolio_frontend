import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'lightbox',
    template: `
        <div class="flex max-h-screen align-center p-10 w-fit">
            <img class="object-contain" [src]="src" />
        </div>
    `,
})
export class LightboxComponent {
    @Input() src = '';
}
