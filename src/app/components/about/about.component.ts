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
        <div class="flex md:flex-row flex-col justify-between mt-32">
            <div class="lg:mr-32 mr-0 mb-10">
                <h1 class="lg:text-8xl text-6xl mb-10">{{ title }}</h1>
                <p [innerHTML]="bio"></p>
            </div>
            <div class="aspect-square h-96">
                <img
                    class="object-fill h-full"
                    [src]="hostUrl + imageUrl"
                    alt="bio image"
                />
            </div>
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
                this.title = res.data.attributes.title;
                this.bio = res.data.attributes.biography;

                this.imageUrl = res.data.attributes.image.data.attributes.url;
            });
    }

    ngOnInit() {
        this.getContent();
    }
}
