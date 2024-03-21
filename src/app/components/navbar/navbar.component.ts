import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LangService } from '../../services/lang.service';
import { Observable, Subject, Subscription, of } from 'rxjs';

@Component({
    standalone: true,
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    imports: [RouterLink, RouterLinkActive, NgClass],
    styleUrls: ['navbar.scss'],
})
export class NavbarComponent {
    navVisible = true;

    canHideNav = new Subject<boolean>();

    navVisibilitySub: Subscription;

    langSvc = inject(LangService);

    router = inject(Router);

    toggleNav(): void {
        this.navVisible = !this.navVisible;

        if (this.navVisible) {
            this.canHideNav.next(true);
        } else {
            this.canHideNav.next(false);
        }
    }

    hideNav(): void {
        this.navVisible = false;
        this.canHideNav.next(false);
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
        this.navVisibilitySub = this.canHideNav.subscribe((value) => {
            console.log('can hide nav: ', value);
            if (value) {
                setTimeout(() => {
                    this.hideNav();
                }, 4000);
            }
        });

        // initial hide
        setTimeout(() => {
            this.hideNav();
        }, 3000);
    }

    navClicked() {
        this.canHideNav.next(false);
    }

    ngOnDestroy() {
        this.navVisibilitySub.unsubscribe();
    }
}
