import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../services/gallery-image.service';
import { Router } from '@angular/router';

interface Response {
    data: AboutData;
}

interface AboutData {
    attributes: AboutAttributes;
    id: number;
}

interface AboutAttributes {
    title: string;
    background: Image;
}

@Component({
    standalone: true,
    selector: 'contact',
    templateUrl: './contact.component.html',
    imports: [],
})
export class ContactComponent {
    hostUrl = environment.apiUrl;

    http = inject(HttpClient);

    title: string;

    backgroundImageUrl: string;

    getContent() {
        this.http
            .get<Response>(this.hostUrl + '/api/contact' + '/?populate=*')
            .subscribe((res) => {
                this.title = res.data.attributes.title;

                this.backgroundImageUrl =
                    res.data.attributes.background.data.attributes.url;
            });
    }

    ngOnInit() {
        this.getContent();
    }
}
