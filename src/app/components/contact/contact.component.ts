import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../services/gallery-image.service';
import { LangService } from '../../services/lang.service';
import { IfLangDirective } from '../../directives/ifLang.directive';

interface Response {
    data: AboutData;
}

interface AboutData {
    attributes: AboutAttributes;
    id: number;
}

interface AboutAttributes {
    title: string;
    titleEng: string;
}

@Component({
    standalone: true,
    selector: 'contact',
    templateUrl: './contact.component.html',
    imports: [IfLangDirective],
    styleUrl: './contact.scss',
})
export class ContactComponent {
    hostUrl = environment.apiUrl;

    http = inject(HttpClient);

    langSvc = inject(LangService);

    title: string;
    titleEng: string;

    backgroundImageUrl: string;

    getContent() {
        this.http
            .get<Response>(this.hostUrl + '/api/contact' + '/?populate=*')
            .subscribe((res) => {
                this.title = res.data.attributes.title;
                this.titleEng = res.data.attributes.titleEng;
            });
    }

    ngOnInit() {
        this.getContent();
    }

    get currentLang(): 'pl' | 'en' {
        return this.langSvc.currentLang;
    }

    get namePlaceholder() {
        return this.currentLang === 'pl'
            ? 'twoje imie i nazwisko'
            : 'your name and surname';
    }

    get messagePlaceholder() {
        return this.currentLang === 'pl';
    }
}
