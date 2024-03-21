import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LangService {
    private _currentLang: 'pl' | 'en' = 'pl';

    toggleLang() {
        if (this._currentLang === 'pl') {
            this._currentLang = 'en';
        } else {
            this._currentLang = 'pl';
        }
    }

    get currentLang() {
        return this._currentLang;
    }
}
