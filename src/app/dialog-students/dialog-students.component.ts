import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StudentsModel} from '../model/students.model';
import {StudentsService} from '../service/students.service';


@Component({
  selector: 'app-dialog-students',
  templateUrl: './dialog-students.component.html',
  styleUrls: ['./dialog-students.component.css']
})
export class DialogStudentsComponent implements OnInit {
  addingStudentsModel: StudentsModel;
  dataSource = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentsService: StudentsService) {
    if (data.action === 'add') {
      data.model = new StudentsModel();
      data.model.id = 0;
    }
  }


  ngOnInit(): void {
  }

  studentsAction() {
    const dataForService = new StudentsModel();
    dataForService.id = this.data.model.id;
    dataForService.lastName = this.data.model.lastName;
    dataForService.firstName = this.data.model.firstName;
    dataForService.address = this.data.model.address;
    dataForService.birthdate = this.data.model.birthdate;
    dataForService.phoneNumber = this.data.model.phoneNumber;
    dataForService.sex = this.data.model.sex;
    this.studentsService.createStudents(dataForService).subscribe(res => {
      console.log(res);
    });
  }

}
