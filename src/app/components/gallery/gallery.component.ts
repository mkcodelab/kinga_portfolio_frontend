import { NgClass, NgFor, NgIf } from '@angular/common';
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
    imports: [NgFor, NgIf, NgClass, GalleryCardComponent, LightboxComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryComponent {
    galleryImages: string[] = [];

    galleryImageSvc = inject(GalleryImageService);

    hostUrl = environment.apiUrl;

    private url = this.hostUrl + '/api/galleries';

    private getFullApiResponse = true;

    // query string for url
    private qs = this.getFullApiResponse
        ? '?populate=*'
        : '?populate[image][fields][0]=url';

    lightboxOpen = false;

    currentImage: string;

    ngOnInit(): void {
        this.getImages();
    }

    getImages(): void {
        this.galleryImageSvc
            .getImageUrls(this.url + this.qs)
            .subscribe((res) => {
                this.galleryImages = res;
            });
    }

    onSwiperSlideClick(target: EventTarget | null): void {
        if (target) {
            const el = target as HTMLImageElement;
            this.currentImage = el.src;
            this.lightboxOpen = true;
        }
    }

    onLightboxClose(): void {
        this.lightboxOpen = false;
    }
}
