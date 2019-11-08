import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    body = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(private authenticationService: AuthenticationService,
                public router: Router) {
    }

    ngOnInit() {
    }
    onSignup() {

        this.authenticationService.login('admin/login', this.body).subscribe(
            (result => {

            })
        );
        localStorage.setItem('isLoggedin', 'true');
    }
}
