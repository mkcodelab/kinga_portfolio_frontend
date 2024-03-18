import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '', component: GalleryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'work', component: WorkComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' },
];
