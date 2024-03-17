import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'gallery-card',
    template: `
        <div style="width: 500px; height: 500px;" class="object-center">
            <img class="object-cover object-center h-64 w-full " [src]="src" />
        </div>
    `,
    imports: [],
})
export class GalleryCardComponent {
    @Input() src: string = '';
}
