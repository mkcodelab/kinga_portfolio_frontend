import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'gallery-card',
    template: `
        <div style="width: 500px; height: 500px;" class="object-center">
            <img
                class="object-cover object-center w-full "
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
