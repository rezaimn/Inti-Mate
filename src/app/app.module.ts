import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageTranslationModule} from './shared/modules/language-translation/language-translation.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {HttpService} from './shared/services/http.service';
import {EventEmitterService} from './shared/services/event-emitter.service';
import {AlertMessageService} from './shared/services/alert-message.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {FormsModule} from '@angular/forms';
import {SharedModule} from './shared/modules/shared.module';
import {DataService} from './shared/services/data.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        AlertMessageService,
        EventEmitterService,
        DataService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
