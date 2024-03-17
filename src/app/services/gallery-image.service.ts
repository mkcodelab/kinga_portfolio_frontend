import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of } from 'rxjs';
import { GalleryImage } from '../components/gallery/interface';
// import { GalleryData } from '../components/gallery/gallery.component';

export interface GalleryData {
    data: GalleryImage[];
}

interface Image {
    url: string;
}

interface Entry<T> {
    id: number;
    attributes: T;
}

interface Response {
    data: Entry<Image>[];
}

@Injectable({
    providedIn: 'root',
})
export class GalleryImageService {
    http = inject(HttpClient);

    error: any | undefined;

    getData(url: string, options?: any): any {
        return this.http.get<Response>(url, options);
    }

    getImageAttrs(url: string, options?: any): Observable<any[]> {
        return this.http.get<Response>(url, options).pipe(
            map((response: any) => {
                return response['data'].map((image: any) => image.attributes);
            })
        );
    }

    getImageUrls(url: string, options?: any): Observable<string[]> {
        return this.http.get<Response>(url, options).pipe(
            catchError((error) => this.handleError(error)),
            map((response: any) => {
                return response['data'].map((image: any) => {
                    return image.attributes.image.data.attributes.url;
                });
            })
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        this.error = error;
        return of();
    }
}
