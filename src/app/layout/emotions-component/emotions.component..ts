import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';

@Component({
    selector: 'app-emotions',
    templateUrl: './emotions.component.html',
    styleUrls: ['./emotions.component..scss'],
    animations: [routerTransition()]
})
export class EmotionsComponent implements OnInit {
    generalFeelingSelected = '';
    selectedLevel = 0;
    allEmotions = [];
    levelOne;
    levelOneSelected;
    levelTwo;
    levelTwoSelected;
    levelThree;
    levelThreeSelected;

    constructor(private httpService: HttpService) {


    }

    ngOnInit() {
        this.getEmotionList();
    }

    getEmotionList() {
        this.httpService.get('emotions').subscribe(
            (result => {
                this.allEmotions = result.result;
            })
        );
    }

    preparePrimaryEmotions(selected) {
        this.levelOne = this.allEmotions.filter(item => {
            return item.type === selected;
        });
        this.selectedLevel = 1;
        this.levelOneSelected = undefined;
        this.levelTwoSelected = undefined;
        this.levelThreeSelected = undefined;
    }

    prepareSecondaryEmotions(selected) {
        this.selectedLevel = 2;
        this.levelOneSelected = selected;
        this.levelTwo = this.levelOne[selected].children;
        this.levelTwoSelected = undefined;
        this.levelThreeSelected = undefined;
    }

    prepareTertiaryEmotions(selected) {
        this.levelTwoSelected = selected;
        this.levelThree = this.levelTwo[selected].children;
        this.levelThreeSelected = undefined;
        this.selectedLevel = 3;
    }
}
