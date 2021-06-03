import {Component, OnInit} from '@angular/core';
import {StaffModel} from '../model/staff.model';
import {StaffService} from '../service/staff.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentExampleDialogComponent} from '../dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
    displayedColumns: string[] = ['ID', 'position', 'firstName', 'lastName', 'birthdate', 'address', 'phoneNumber', 'sex', 'actions'];
    dataSource = [];
    panelOpenState = false;
    addingStaffModel: StaffModel;

    constructor(private staffService: StaffService,
                public dialog: MatDialog) {
        this.addingStaffModel = new StaffModel();
    }

    ngOnInit(): void {
        this.getAllStaff();
    }

    addStaff() {
        console.log(this.addingStaffModel);
        console.log(this.addingStaffModel.firstName);
        this.staffService.createStaff(this.addingStaffModel).subscribe(res => {
            console.log(res);
            this.addingStaffModel = new StaffModel();
            this.getAllStaff();
        });
    }

    getAllStaff() {
        this.staffService.getAllStaff().subscribe(res => {
            console.log(res);
            this.dataSource = res;
            console.log(this.dataSource);
        });
    }

    deleteStaff(id: number) {
        this.staffService.deleteStaff(id).subscribe(() => this.getAllStaff());
    }

    openDialog(element, action) {
        console.log(element);
        const dialogData = {
            model: element,
            action: action
        };

        const dialogRef = this.dialog.open(DialogContentExampleDialogComponent,
            {
                data: dialogData,
                width: '600px'
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.getAllStaff();
        });
    }

}

