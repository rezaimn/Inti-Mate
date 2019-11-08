import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../../router.animations';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    login = {
        email: '',
        password: ''
    };

    constructor(
        private authenticationService: AuthenticationService,
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    onLoggedin() {

        this.authenticationService.login('admin/login', this.login).subscribe(
            (result => {
                localStorage.setItem('token', result.result.token.token);
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('username', result.result.user.username);
                this.router.navigate(['/physical-sensations']);
            })
        );

    }
}
