import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';

@Component({
    selector: 'app-emotion-sens-relation',
    templateUrl: './emotion-sens-relation-component.html',
    styleUrls: ['./emotion-sens-relation-component.scss'],
    animations: [routerTransition()]
})
export class EmotionSensRelationComponent implements OnInit {

    physicalSensationList = [];
    secondaryEmotionList = [];
    allEmotions = [];
    emotionSens;
    physicalTableRowData = [];

    constructor(private httpService: HttpService) {


    }

    ngOnInit() {
        this.getPhysicalSensationList();
    }

    getPhysicalSensationList() {
        this.httpService.get('physical_sensation').subscribe(
            (result => {
                this.physicalSensationList = result.result;
                // this.physicalTableRowData = this.physicalSensationList.map(item => {
                //     const tableRow = {
                //         id: item.id,
                //         related: false
                //     };
                //     return tableRow;
                // });
                this.getEmotionList();
            })
        );
    }

    getEmotionList() {
        this.httpService.get('emotions').subscribe(
            (result => {
                this.allEmotions = result.result;
                this.getEmotionSensationList();
            })
        );
    }

    getEmotionSensationList() {
        this.httpService.get('emotion_sense').subscribe(
            (result => {
                this.emotionSens = result.result;
                this.calculateEmotionSensTable();
            })
        );
    }

    calculateEmotionSensTable() {
        this.secondaryEmotionList = [];
        for (const emotion of this.allEmotions) {
            if (emotion.children.length > 0) {
                Array.prototype.push.apply(this.secondaryEmotionList, emotion.children);
            }
        }
        this.secondaryEmotionList.forEach(secondary => {
                secondary.physicalList = [];
                for (const sens of this.physicalSensationList) {
                    const temp = {
                        id: sens.id,
                        related: false
                    };
                    secondary.physicalList.push(temp);
                }
                for (const emotion of this.emotionSens) {
                    if (emotion.emotion_id === secondary.id) {
                        for (const physical of emotion.physical_sensation) {
                            this.physicalSensationList.forEach((sens, index) => {
                                    if (physical.id === sens.id) {
                                        secondary.physicalList[index].related = true;
                                    }
                                }
                            );
                        }
                    }

                }
            }
        );
    }

    setRelation(emotionIndex, physicalIndex) {
        this.secondaryEmotionList[emotionIndex].physicalList[physicalIndex].related =
            !this.secondaryEmotionList[emotionIndex].physicalList[physicalIndex].related;
    }

    edit() {

        for (const emotion of this.secondaryEmotionList) {
            const sensList = {
                physical_sensation: []
            };
            sensList.physical_sensation = emotion.physicalList.filter(item => {
                if (item.related) {
                    return item;
                }
            }).map(item => {
                return item.id;
            });
            if (sensList.physical_sensation.length > 0) {
                this.httpService.put(`emotion_sense/${emotion.id}`, sensList).subscribe(
                    (result => {

                    })
                );
            }
        }
    }

    cancel() {
        this.calculateEmotionSensTable();
    }
}
