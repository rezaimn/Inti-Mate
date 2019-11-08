import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpService} from '../../shared/services/http.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-physical-sensation',
    templateUrl: './physical-sensation.component.html',
    styleUrls: ['./physical-sensation.component.scss'],
    animations: [routerTransition()]
})
export class PhysicalSensationComponent implements OnInit {
    physicalSensation = {
        id: '',
        name: '',
        order: ''
    };
    editMode = false;
    physicalSensationList = [];
    selectedIndex;
    selectedItem;

    constructor(private httpService: HttpService, private modalService: NgbModal) {


    }

    ngOnInit() {
        this.getPhysicalSensationList();
    }

    getPhysicalSensationList() {
        this.httpService.get('physical_sensation').subscribe(
            (result => {
                this.physicalSensationList = result.result;
            })
        );
    }

    setEditMode(item, index) {
        this.selectedIndex = index;
        this.selectedItem = item;
        this.editMode = true;
        this.physicalSensation = {...item};
    }

    add() {
        this.httpService.post(`physical_sensation`, this.physicalSensation).subscribe(
            (result => {
                this.physicalSensationList.push(result.result);
                this.resetForm();
            })
        );
    }

    edit() {
        this.httpService.put(`physical_sensation/${this.physicalSensation.id}`, this.physicalSensation).subscribe(
            (result => {
                this.physicalSensationList[this.selectedIndex] = {...result.result};
                this.resetForm();
            })
        );
    }

    addEdit() {
        if (this.editMode) {
            this.edit();
        } else {
            delete this.physicalSensation.id;
            this.add();
        }
    }

    resetForm() {
        this.editMode = false;
        this.physicalSensation = {
            id: '',
            name: '',
            order: ''
        };
    }

    delete() {
        this.httpService.delete(`physical_sensation/${this.selectedItem.id}`).subscribe(
            (result => {
                this.physicalSensationList.splice(this.selectedIndex, 1);
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
