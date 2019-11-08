import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {EventEmitterService} from './event-emitter.service';
import {AlertMessageService} from './alert-message.service';

/**
 * this service is for handling RESTFUL APIs
 */
@Injectable()
export class HttpService {
    token: string = localStorage.getItem('token');

    constructor(private http: HttpClient, private eventEmitterService: EventEmitterService, private alertMessageService: AlertMessageService) {
    }

    /**
     *  it adds the input url to the base URL
     */
    getFullUrl(url: string) {
        return environment.baseUrl + url;
    }

    /**
     * @param {string:url}
     *  Here we can call a get request to get an/array item/s.
     *  @return {Observable}
     */
    get(url: string): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.get(this.getFullUrl(url), this.getHeaders('get')).pipe(
            tap(
                (res: any) => {
                    this.eventEmitterService.loading.emit(false);
                },
                (error: any) => {
                    console.log(error)
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    /**
     * @param {string:url},{json:body}
     *  Here we can call a post request to add an item.
     *  @return {Observable}
     */
    post(url: string, body: any): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.post(this.getFullUrl(url), body, this.getHeaders('post')).pipe(
            tap(
                (res: any) => {
                    this.alertMessageService.success('Create Item', 'Item Created Successfully');
                    this.eventEmitterService.loading.emit(false);
                },
                (error: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    formData(url: string, body: any): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.post(this.getFullUrl(url), body, this.getHeaders('form-data')).pipe(
            tap(
                (res: any) => {
                    this.alertMessageService.success('Create Item', 'Item Created Successfully');
                    this.eventEmitterService.loading.emit(false);
                },
                (error: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    formDataUpdate(url: string, body: any): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.put(this.getFullUrl(url), body, this.getHeaders('form-data')).pipe(
            tap(
                (res: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.success('Update Item', 'Item Updated Successfully');
                },
                (error: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    /**
     * @param {string:url},{json:body}
     *  Here we can call a put request to update an item.
     *  @return {Observable}
     */
    put(url: string, body: any): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.put(this.getFullUrl(url), body, this.getHeaders('put')).pipe(
            tap(
                (res: any) => {
                    this.alertMessageService.success('Update Item', 'Item Updated Successfully');
                    this.eventEmitterService.loading.emit(false);
                },
                (error: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    /**
     * @param {string:url}
     *  Here we can call a delete request to delete an item.
     *  @return {Observable}
     */
    delete(url: string): Observable<any> {
        this.eventEmitterService.loading.emit(true);
        return this.http.delete(this.getFullUrl(url), this.getHeaders('delete')).pipe(
            tap(
                (res: any) => {
                    this.alertMessageService.success('Delete Item', 'Item Deleted Successfully');
                    this.eventEmitterService.loading.emit(false);

                },
                (error: any) => {
                    this.eventEmitterService.loading.emit(false);
                    this.alertMessageService.fail(error.status, error && error.message);
                }
            )
        );
    }

    getHeaders(requestType) {
        let requestsHeader;
        switch (requestType) {
            case 'get': {
                requestsHeader = new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                });
                break;
            }
            case 'post': {
                requestsHeader = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'
                });
                break;
            }
            case 'form-data': {
                requestsHeader = new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'
                });
                break;
            }
            default: {
                requestsHeader = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Accept': 'application/json'
                });
            }
        }
        return {headers: requestsHeader};
    }

}
