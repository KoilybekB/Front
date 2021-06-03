import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StaffModel} from '../model/staff.model';
import {StaffService} from '../service/staff.service';


@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {
  addingStaffModel: StaffModel;
  dataSource = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private staffService: StaffService) {
    if (data.action === 'add') {
      data.model = new StaffModel();
      data.model.id = 0;
    }
  }


  ngOnInit(): void {
  }

  staffAction() {
    const dataForService = new StaffModel();
    dataForService.id = this.data.model.id;
    dataForService.lastName = this.data.model.lastName;
    dataForService.firstName = this.data.model.firstName;
    dataForService.position = this.data.model.position;
    dataForService.address = this.data.model.address;
    dataForService.birthdate = this.data.model.birthdate;
    dataForService.phoneNumber = this.data.model.phoneNumber;
    dataForService.sex = this.data.model.sex;
    this.staffService.createStaff(dataForService).subscribe(res => {
      console.log(res);
    });
  }

}
