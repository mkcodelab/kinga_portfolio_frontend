import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LangService {
    private _currentLang: 'pl' | 'en' = 'pl';

    currentLang$ = new Subject<string>();

    // constructor() {
    //     this.currentLang$.next(this._currentLang);
    //     console.log(this._currentLang);
    // }

    toggleLang() {
        if (this._currentLang === 'pl') {
            this._currentLang = 'en';
        } else {
            this._currentLang = 'pl';
        }
        this.currentLang$.next(this._currentLang);
    }

    get currentLang() {
        return this._currentLang;
    }
}
