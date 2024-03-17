import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    imports: [RouterLink, NgClass],
    styleUrls: ['navbar.scss'],
})
export class NavbarComponent {
    navVisible = true;

    toggleNav() {
        this.navVisible = !this.navVisible;
    }

    // add some form of subscription to visible, and after some time toggle it to invisible
}
