import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LangService } from '../../services/lang.service';

@Component({
    standalone: true,
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    imports: [RouterLink, RouterLinkActive, NgClass],
    styleUrls: ['navbar.scss'],
})
export class NavbarComponent {
    navVisible = true;

    langSvc = inject(LangService);

    toggleNav() {
        this.navVisible = !this.navVisible;
    }

    switchLanguage() {
        this.langSvc.toggleLang();
    }

    get lang() {
        return this.langSvc.currentLang;
    }
    // add some form of subscription to visible, and after some time toggle it to invisible
}
