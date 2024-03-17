import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { GalleryImage } from '../components/gallery/interface';
// import { GalleryData } from '../components/gallery/gallery.component';

// export interface GalleryData {
//     data: GalleryImage[];
// }
interface Response {
    data: Entry<Image>[];
}

interface Image {
    createdAt: string;
    image: ImageData;
    publishedAt: string;
    updatedAt: string;
    // attributes: ImageAttributes;
}

interface ImageData {
    data: ImageDataAttributes;
    id: number;
}

interface ImageDataAttributes {
    attributes: any;
    id: number;
    // url: string;
}

interface Entry<T> {
    id: number;
    attributes: T;
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

    // getImageUrls(url: string, options?: any): Observable<string[]> {
    //     return this.http.get<Response>(url, options).pipe(
    //         catchError((error) => this.handleError(error)),
    //         // tap((response) => console.log(response)),
    //         map((response: any) => {
    //             return response['data'].map((image: any) => {
    //                 return image.attributes.image.data.attributes.url;
    //             });
    //         })
    //     );
    // }

    getImageUrls(url: string): Observable<string[]> {
        return this.http.get<Response>(url).pipe(
            catchError((error) => this.handleError(error)),
            map((response: Response) => {
                return response.data.map((image: Entry<Image>) => {
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
