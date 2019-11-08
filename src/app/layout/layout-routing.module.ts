import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {PhysicalSensationComponent} from './physical-sensation-component/physical-sensation.component';
import {EmotionsComponent} from './emotions-component/emotions.component.';
import {EmotionSensRelationComponent} from './emotion-sens-relation-component/emotion-sens-relation-component';
import {ThinkHabitComponent} from './think-habit-component/think-habit-component';
import {MessagingWizardComponent} from './messaging-wizard-component/messaging-wizard-component';
import {ThoughtMirrorComponent} from './thought-mirror-component/thought-mirror-component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'physical-sensations', pathMatch: 'prefix'},
            {path: 'physical-sensations', component: PhysicalSensationComponent},
            {path: 'emotions', component: EmotionsComponent},
            {path: 'emotion-physical', component: EmotionSensRelationComponent},
            {path: 'thinking-habit-cards', component: ThinkHabitComponent},
            {path: 'thought-mirror-dependencies', component: ThoughtMirrorComponent},
            {path: 'message-wizard', component: MessagingWizardComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
