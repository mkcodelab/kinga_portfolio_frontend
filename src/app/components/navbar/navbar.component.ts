import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LangService } from '../../services/lang.service';

@Component({
    standalone: true,
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    imports: [RouterLink, RouterLinkActive, NgClass],
    styleUrls: ['navbar.scss'],
})
export class NavbarComponent {
    logoVisible = false;

    navVisible = true;

    langSvc = inject(LangService);

    router = inject(Router);

    toggleNav(): void {
        this.navVisible = !this.navVisible;
    }

    hideNav(): void {
        this.navVisible = false;
    }
    showNav(): void {
        this.navVisible = true;
    }

    switchLanguage(): void {
        this.langSvc.toggleLang();
    }

    get lang(): 'pl' | 'en' {
        return this.langSvc.currentLang;
    }

    get contactRouteActive(): boolean {
        return this.router.url === '/contact';
    }

    ngOnInit() {
        // initial hide
        setTimeout(() => {
            this.hideNav();
        }, 3000);

        setTimeout(() => {
            this.logoVisible = true;
        }, 2500);
    }
}
