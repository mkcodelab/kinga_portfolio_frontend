import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface Response {
    data: Entry<ImageEntry>[];
}

interface Entry<T> {
    id: number;
    attributes: T;
}

interface ImageEntry {
    createdAt: string;
    image: Image;
    publishedAt: string;
    updatedAt: string;
}

interface Image {
    data: ImageData;
    id: number;
}

interface ImageData {
    attributes: ImageDataAttributes;
    id: number;
}

interface ImageDataAttributes {
    url: string;
}

@Injectable({
    providedIn: 'root',
})
export class GalleryImageService {
    http = inject(HttpClient);

    error: any | undefined;

    // not sure if it should be passed to get methods or be hardcoded here
    hostUrl = environment.apiUrl;

    private url = this.hostUrl + '/api/galleries';

    private qs = '?populate[image][fields][0]=url';

    getData(): Observable<Response> {
        return this.http.get<Response>(this.url + this.qs);
    }

    getImageAttrs(url: string): Observable<any[]> {
        return this.http.get<Response>(url).pipe(
            map((response: Response) => {
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
            tap((res) => console.log(res)),
            map((response: Response) => {
                return response.data.map((image: Entry<ImageEntry>) => {
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
