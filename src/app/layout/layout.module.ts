import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './shared-components/sidebar/sidebar.component';
import {HeaderComponent} from './shared-components/header/header.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LayoutHttpInterceptor} from '../shared/interceptor/layout-http.interceptor';
import {SharedModule} from '../shared/modules/shared.module';
import {PhysicalSensationComponent} from './physical-sensation-component/physical-sensation.component';
import {HttpService} from '../shared/services/http.service';
import {EmotionsComponent} from './emotions-component/emotions.component.';
import {EmotionCrudComponent} from './emotions-component/emotion-crud-component/emotion-crud-component';
import {EmotionSensRelationComponent} from './emotion-sens-relation-component/emotion-sens-relation-component';
import {ThinkHabitComponent} from './think-habit-component/think-habit-component';
import {MessagingWizardComponent} from './messaging-wizard-component/messaging-wizard-component';
import {ThoughtMirrorComponent} from './thought-mirror-component/thought-mirror-component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        PhysicalSensationComponent,
        EmotionsComponent,
        EmotionCrudComponent,
        EmotionSensRelationComponent,
        ThinkHabitComponent,
        ThoughtMirrorComponent,
        MessagingWizardComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: LayoutHttpInterceptor, multi: true}
    ]
})
export class LayoutModule {
}
