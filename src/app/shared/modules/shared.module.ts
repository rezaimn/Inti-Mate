import {NgModule} from '@angular/core';
import {HttpService} from '../services/http.service';
import {AlertMessageComponent} from '../components/alert-message/alert-message.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    /**
     * Here we can add modules that we want to share.
     */
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forChild(),
        NgbModalModule
    ],
    /**
     * Here we can add components, pipes and directives that we want to share.
     */
    declarations: [
        AlertMessageComponent
    ],
    /**
     * Here we can add modules, components, pipes and directives that we want to share.
     */
    exports: [
        AlertMessageComponent,
        FormsModule,
        NgbModalModule
    ],
    entryComponents: [],
    /**
     * Here we can add services that we want to share.
     */
    providers: [
        HttpService,
    ]
})

/**
 * we added some modules,services,pipes and components here to share them with other modules.
 */
export class SharedModule {
}
