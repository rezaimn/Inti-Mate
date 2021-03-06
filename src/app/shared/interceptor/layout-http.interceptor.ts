import {Injectable} from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AlertMessageService} from '../../shared/services/alert-message.service';

@Injectable()
export class LayoutHttpInterceptor implements HttpInterceptor {
    constructor(public alertMessageService: AlertMessageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("1111111111111111111111111111111")
        const token: string = localStorage.getItem('token');


        if (token) {
            request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        }

        request = request.clone({headers: request.headers.set('Accept', 'application/json')});

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.alertMessageService.fail(error.status, error && error.error.reason ? error.error.reason : '');
                return throwError(error);
            }));
    }
}
