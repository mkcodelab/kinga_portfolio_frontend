import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { LangService } from '../services/lang.service';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[ifLang]',
    standalone: true,
})
export class IfLangDirective implements OnInit {
    @Input()
    ifLang: string;

    langSub: Subscription;

    private langSvc = inject(LangService);
    private template = inject(TemplateRef);
    private vcr = inject(ViewContainerRef);

    ngOnInit(): void {
        // first appearance
        if (this.langSvc.currentLang === this.ifLang) {
            this.vcr.createEmbeddedView(this.template);
        }

        // subscribe to lang change
        this.langSub = this.langSvc.currentLang$.subscribe((lang) => {
            if (lang == this.ifLang) {
                this.vcr.createEmbeddedView(this.template);
            } else {
                this.vcr.remove();
            }
        });
    }

    ngOnDestroy() {
        this.langSub.unsubscribe();
    }
}
