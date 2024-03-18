import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'gallery-card',
    template: `
        <div class="object-center">
            <img
                loading="lazy"
                class="w-fit"
                [src]="src"
                style="height: 500px;"
            />
        </div>
    `,
    imports: [],
})
export class GalleryCardComponent {
    @Input() src: string = '';
}
