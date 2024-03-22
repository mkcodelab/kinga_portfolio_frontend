import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    templateUrl: './cover.component.html',
    selector: 'cover',
    styleUrl: './cover.scss',
    imports: [NgClass],
})
export class CoverComponent {
    hideAnimation = false;
    hide = false;
    scaleAnimation = true;

    ngOnInit() {
        setTimeout(() => {
            this.hideAnimation = true;
        }, 500);

        setTimeout(() => {
            this.scaleAnimation = false;
        }, 1000);

        setTimeout(() => {
            this.hide = true;
        }, 2500);
    }
}
