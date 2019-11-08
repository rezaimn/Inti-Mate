import {Component, Input, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpService} from '../../../shared/services/http.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-emotion-crud',
    templateUrl: './emotion-crud-component.html',
    styleUrls: ['./emotion-crud-component.scss'],
    animations: [routerTransition()]
})
export class EmotionCrudComponent implements OnInit {
    emotion = {
        id: '',
        name: '',
        verb: '',
        definition: '',
        example: '',
        type: '',
        level: '',
        parent: 0
    };
    editMode = false;
    @Input() type = '';
    @Input() level = '';
    @Input() parent = '';
    @Input() tableTitle = '';
    @Input() crudTitle = '';
    @Input() emotionList = [];

    selectedIndex;
    selectedItem;

    constructor(private httpService: HttpService, private modalService: NgbModal) {

    }

    ngOnInit() {
        this.emotion.type = this.type;
        this.emotion.level = this.level;
        this.emotion.parent = parseInt(this.parent, 10);
        this.resetForm();
    }

    setEditMode(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
        this.editMode = true;
        this.emotion = {...item};
    }

    add() {
        this.httpService.post(`emotions`, this.emotion).subscribe(
            (result => {
                this.emotionList.push(result.result);
                this.resetForm();
            })
        );
    }

    edit() {
        this.httpService.put(`emotions/${this.emotion.id}`, this.emotion).subscribe(
            (result => {
                this.emotionList[this.selectedIndex] = {...this.emotion};
                this.resetForm();
            })
        );
    }

    addEdit() {
        if (this.editMode) {
            this.edit();
        } else {
            delete this.emotion.id;
            this.add();
        }
    }

    resetForm() {
        this.editMode = false;
        this.emotion = {
            id: '',
            name: '',
            verb: '',
            definition: '',
            example: '',
            type: this.type,
            level: this.level,
            parent: parseInt(this.parent, 10)
        };
    }
    delete() {
        this.httpService.delete(`emotions/${this.selectedItem.id}`).subscribe(
            (result => {
                this.emotionList.splice(this.selectedIndex, 1);
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
