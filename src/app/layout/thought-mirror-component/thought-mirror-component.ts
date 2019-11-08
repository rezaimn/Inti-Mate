import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';
import {environment} from '../../../environments/environment';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-thought-mirror',
    templateUrl: './thought-mirror-component.html',
    styleUrls: ['./thought-mirror-component.scss'],
    animations: [routerTransition()]
})
export class ThoughtMirrorComponent implements OnInit {
    thoughtMirror = {
        id: '',
        definition: '',
        first: 0,
        second: 0,
    };
    editMode = false;
    thoughtMirrorList = [];
    thinkHabitList = [];
    firstThinkHabitList = [];
    secondThinkHabitList = [];
    selectedIndex;
    selectedItem;

    constructor(private httpService: HttpService, private modalService: NgbModal) {


    }

    ngOnInit() {
        this.getThoughtMirrorList();
    }

    getThoughtMirrorList() {
        this.httpService.get('thought_mirror').subscribe(
            (result => {
                this.thoughtMirrorList = result.result;
                this.getThinkHabitList();
            })
        );
    }

    getThinkHabitList() {
        this.httpService.get('think_habit').subscribe(
            (result => {
                this.thinkHabitList = result.result;
                this.firstThinkHabitList = [...this.thinkHabitList];
                this.secondThinkHabitList = [...this.thinkHabitList];
            })
        );
    }

    getThinkHabitById(id) {

        for (const thinkHabit of this.thinkHabitList) {
            if (id === thinkHabit.id) {
                return thinkHabit.name;
            }
        }
    }

    setEditMode(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
        this.editMode = true;
        this.thoughtMirror.id = item.id;
        this.thoughtMirror.definition = item.definition;
        if (item.habit_cards) {
            this.thoughtMirror.first = item.habit_cards[0];
            this.thoughtMirror.second = item.habit_cards[1];
        }
    }

    add() {
        const body = {
            definition: this.thoughtMirror.definition,
            habit_card: [
                this.thoughtMirror.first,
                this.thoughtMirror.second
            ]
        };
        this.httpService.post(`thought_mirror`, body).subscribe(
            (result => {
                const res: any = body;
                res.habit_cards = [...body.habit_card];
                res.id = result.result.id;
                this.thoughtMirrorList.push(res);
                this.resetForm();
            })
        );
    }

    edit() {
        const body = {
            definition: this.thoughtMirror.definition,
            habit_card: [
                this.thoughtMirror.first,
                this.thoughtMirror.second
            ]
        };
        this.httpService.put(`thought_mirror/${this.thoughtMirror.id}`, body).subscribe(
            (result => {
                const res: any = body;
                res.id = result.result.id;
                res.habit_cards = [...body.habit_card];
                this.thoughtMirrorList[this.selectedIndex] = {...res};
                this.resetForm();
            })
        );
    }

    addEdit() {
        if (this.editMode) {
            this.edit();
        } else {
            delete this.thoughtMirror.id;
            this.add();
        }
    }

    resetForm() {
        this.editMode = false;
        this.thoughtMirror = {
            id: '',
            definition: '',
            first: 0,
            second: 0,
        };
    }

    delete() {
        this.httpService.delete(`thought_mirror/${this.selectedItem.id}`).subscribe(
            (result => {
                this.thoughtMirrorList.splice(this.selectedIndex, 1);
            })
        );
    }

    selectItemToDelete(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
    }

    resetModal() {
        this.selectedIndex = null;
        this.selectedItem = null;
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
        }, (reason) => {
            this.getDismissReason(reason);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
