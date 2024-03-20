import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Image } from '../../services/gallery-image.service';

interface Response {
    data: AboutData;
}

interface AboutData {
    attributes: AboutAttributes;
    id: number;
}

interface AboutAttributes {
    biography: string;
    title: string;
    image: Image;
}

@Component({
    standalone: true,
    selector: 'about',
    template: `
        <div class="flex justify-between mt-32">
            <div class="mr-32">
                <h1 style="font-size: 95px;">{{ title }}</h1>
                <p [innerHTML]="bio"></p>
            </div>

            <img
                class="object-contain"
                [src]="hostUrl + imageUrl"
                alt="bio image"
            />
        </div>
    `,
    imports: [],
})
export class AboutComponent {
    hostUrl = environment.apiUrl;
    http = inject(HttpClient);

    title: string;
    bio: string;
    imageUrl: string;

    getContent() {
        this.http
            .get<Response>(this.hostUrl + '/api/about' + '/?populate=*')
            .subscribe((res) => {
                console.log(res);
                this.title = res.data.attributes.title;
                this.bio = res.data.attributes.biography;

                this.imageUrl = res.data.attributes.image.data.attributes.url;
            });
    }

    ngOnInit() {
        this.getContent();
    }
}
