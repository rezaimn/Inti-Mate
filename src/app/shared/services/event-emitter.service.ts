import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EventEmitterService {

    constructor() {
    }
    loading = new EventEmitter<boolean>();
    alertMessage: any = new EventEmitter<any>();
}
