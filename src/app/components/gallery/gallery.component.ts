import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { GalleryCardComponent } from './gallery-card.component';
import { GalleryImageService } from '../../services/gallery-image.service';
import { environment } from '../../../environments/environment';
import { LightboxComponent } from './lightbox.component';

export type imageUrl = {
    url: string;
};

@Component({
    standalone: true,
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    imports: [NgFor, NgIf, GalleryCardComponent, LightboxComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryComponent {
    galleryImages: string[] = [];

    galleryImageSvc = inject(GalleryImageService);

    hostUrl = environment.apiUrl;

    private url = this.hostUrl + '/api/galleries';

    // options = { params: { populate: '*' } };

    // query string for url: populate[image][fields][0]=url
    private qs = '?populate[image][fields][0]=url';

    lightboxOpen = false;
    currentImage = '';

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

    onSwiperSlideClick(target: EventTarget | null) {
        if (target) {
            const el = target as HTMLImageElement;
            this.currentImage = el.src;
        }
    }

    onLightboxClose() {
        console.log('closed ');
        this.lightboxOpen = false;
    }
}
