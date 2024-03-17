import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GalleryCardComponent } from './gallery-card.component';
import { GalleryImageService } from '../../services/gallery-image.service';

export type imageUrl = {
    url: string;
};

@Component({
    standalone: true,
    selector: 'gallery',
    template: `
        <div class="mt-10">
            <p>Gallery</p>

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

    hostUrl = 'http://localhost:1337';

    url = this.hostUrl + '/api/galleries';

    // options = { params: { populate: '*' } };

    // query string for url: populate[image][fields][0]=url
    qs = '?populate[image][fields][0]=url';

    ngOnInit() {
        // this.galleryImageSvc
        //     .getData(this.url + this.qs)
        //     .subscribe((response: GalleryData) => {
        //         this.galleryImages = response.data;
        //         console.log('galleryImagesData', this.galleryImages);
        //     });

        // this.galleryImageSvc
        //     .getImageAttrs(this.url + this.qs)
        //     .subscribe((res: any) => {
        //         res.forEach((attribute: any) => {
        //             this.urlArr.push(attribute.image.data.attributes.url);
        //         });
        //     });

        this.galleryImageSvc
            .getImageUrls(this.url + this.qs)
            .subscribe((res) => {
                this.galleryImages = res;
            });
    }
}
