import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-messaging-wizard',
    templateUrl: './messaging-wizard-component.html',
    styleUrls: ['./messaging-wizard-component.scss'],
    animations: [routerTransition()]
})
export class MessagingWizardComponent implements OnInit {
    messageWizard = {
        id: '',
        text: '',
        type: '',
        editable: false
    };
    editMode = false;
    messageWizardList = [];
    selectedIndex;
    selectedItem;

    constructor(private httpService: HttpService, private modalService: NgbModal) {


    }

    ngOnInit() {
        this.getMessageWizardListList();
    }

    getMessageWizardListList() {
        this.messageWizardList = [];
        this.httpService.get('message').subscribe(
            (result => {
                for (const content of result.result) {
                    for (const message of content.content) {
                        this.messageWizardList.push(message);
                    }
                }
            })
        );
    }

    setEditMode(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
        this.editMode = true;
        this.messageWizard = {...item};
    }

    add() {
        this.httpService.post(`message`, this.messageWizard).subscribe(
            (result => {
                this.messageWizardList.push(result.result);
                this.resetForm();
            })
        );
    }

    edit() {
        this.httpService.put(`message/${this.messageWizard.id}`, this.messageWizard).subscribe(
            (result => {
                this.messageWizardList[this.selectedIndex] = {...result.result};
                this.resetForm();
            })
        );
    }

    addEdit() {
        if (this.editMode) {
            this.edit();
        } else {
            delete this.messageWizard.id;
            this.add();
        }
    }

    resetForm() {
        this.editMode = false;
        this.messageWizard = {
            id: '',
            text: '',
            type: '',
            editable: false
        };
    }

    delete() {
        this.httpService.delete(`message/${this.selectedItem.id}`).subscribe(
            (result => {
                this.messageWizardList.splice(this.selectedIndex , 1);
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
