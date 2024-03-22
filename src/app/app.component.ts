import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoverComponent } from './components/cover/cover.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, GalleryComponent, NavbarComponent, CoverComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'Kinga Chałas Portfolio';
}
