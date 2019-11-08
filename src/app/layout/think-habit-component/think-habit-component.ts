import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';
import {environment} from '../../../environments/environment';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-think-habit',
    templateUrl: './think-habit-component.html',
    styleUrls: ['./think-habit-component.scss'],
    animations: [routerTransition()]
})
export class ThinkHabitComponent implements OnInit {
    thinkHabit = {
        id: '',
        name: '',
        definition: '',
        reframe: '',
        icon: null
    };
    editMode = false;
    thinkHabitList = [];
    selectedIndex;
    selectedItem;
    thinkHabitIcon;

    constructor(private httpService: HttpService, private modalService: NgbModal) {


    }

    ngOnInit() {
        this.getThinkHabitList();
    }

    getThinkHabitList() {
        this.httpService.get('think_habit').subscribe(
            (result => {
                this.thinkHabitList = result.result;
                this.thinkHabitList.map(item => {
                    item.icon = environment.downloadUrl + item.icon + '?force=true';
                    return item;
                });
            })
        );
    }

    onFileChanged(event) {
        this.thinkHabitIcon = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (data: any) => { // called once readAsDataURL is completed
            this.thinkHabit.icon = data.target.result;
        };
    }

    setEditMode(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
        this.editMode = true;
        this.thinkHabit = {...item};
    }

    add() {
        const body = new FormData();
        if (this.thinkHabit.icon !== null) {
            body.append('icon', this.thinkHabitIcon);
        }
        body.append('name', this.thinkHabit.name);
        body.append('definition', this.thinkHabit.definition);
        body.append('reframe', this.thinkHabit.reframe);

        this.httpService.formData(`think_habit`, body).subscribe(
            (result => {
                const habit = result.result;
                habit.icon = environment.downloadUrl + habit.icon + '?force=true';
                this.thinkHabitList.push(habit);
                this.resetForm();
            })
        );
    }

    edit() {
        const body = new FormData();
        if (this.thinkHabit.icon !== null) {
            body.append('icon', this.thinkHabitIcon);
        }
        body.append('name', this.thinkHabit.name);
        body.append('definition', this.thinkHabit.definition);
        body.append('reframe', this.thinkHabit.reframe);

        this.httpService.formDataUpdate(`think_habit/${this.thinkHabit.id}`, body).subscribe(
            (result => {
                const habit = result.result;
                habit.icon = environment.downloadUrl + habit.icon + '?force=true';
                this.thinkHabitList[this.selectedIndex] = {...habit};
                this.resetForm();
            })
        );
    }

    addEdit() {
        if (this.editMode) {
            this.edit();
        } else {
            delete this.thinkHabit.id;
            this.add();
        }
    }

    resetForm() {
        this.editMode = false;
        this.thinkHabit = {
            id: '',
            name: '',
            definition: '',
            reframe: '',
            icon: null
        };
    }

    delete() {
        this.httpService.delete(`think_habit/${this.selectedItem.id}`).subscribe(
            (result => {
                this.thinkHabitList.splice(this.selectedIndex, 1);
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
