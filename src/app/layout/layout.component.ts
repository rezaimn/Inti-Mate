import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EventEmitterService} from '../shared/services/event-emitter.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapsedSideBar: boolean;
    loading = false;

    constructor(private eventEmitterService: EventEmitterService,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.eventEmitterService.loading.subscribe(
            (result => {
                this.loading = result;
                this.cdRef.detectChanges();
            })
        );
    }

    receiveCollapsed($event) {
        this.collapsedSideBar = $event;
    }
}
