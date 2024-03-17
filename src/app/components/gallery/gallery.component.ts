import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GalleryCardComponent } from './gallery-card.component';
import { GalleryImageService } from '../../services/gallery-image.service';
import { environment } from '../../../environments/environment';

export type imageUrl = {
    url: string;
};

@Component({
    standalone: true,
    selector: 'gallery',
    template: `
        <div class="mt-10">
            <div class="flex">
                <gallery-card
                    class="mr-2"
                    *ngFor="let item of galleryImages"
                    [src]="hostUrl + item"
                ></gallery-card>
            </div>
        </div>
    `,
    imports: [NgFor, GalleryCardComponent],
})
export class GalleryComponent {
    galleryImages: string[] = [];

    galleryImageSvc = inject(GalleryImageService);

    hostUrl = environment.apiUrl;

    private url = this.hostUrl + '/api/galleries';

    // options = { params: { populate: '*' } };

    // query string for url: populate[image][fields][0]=url
    private qs = '?populate[image][fields][0]=url';

    ngOnInit() {
        this.getImages();
    }

    getImages() {
        this.galleryImageSvc
            .getImageUrls(this.url + this.qs)
            .subscribe((res) => {
                this.galleryImages = res;
            });
    }
}
