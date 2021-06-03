import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StudentsModel} from '../model/students.model';
import {StudentsService} from '../service/students.service';
import {DialogStudentsComponent} from '../dialog-students/dialog-students.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'firstName', 'lastName', 'birthdate', 'address', 'phoneNumber', 'sex', 'actions'];
  dataSource = [];
  panelOpenState = false;
  addingStudentsModel: StudentsModel;

  constructor(private studentsService: StudentsService,
              public dialog: MatDialog) {
    this.addingStudentsModel = new StudentsModel();
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  addStudents() {
    console.log(this.addingStudentsModel);
    console.log(this.addingStudentsModel.firstName);
    this.studentsService.createStudents(this.addingStudentsModel).subscribe(res => {
      console.log(res);
      this.addingStudentsModel = new StudentsModel();
      this.getAllStudents();
    });
  }

  getAllStudents() {
    this.studentsService.getAllStudents().subscribe(res => {
      console.log(res);
      this.dataSource = res;
      console.log(this.dataSource);
    });
  }

  deleteStudents(id: number) {
    this.studentsService.deleteStudents(id).subscribe(() => this.getAllStudents());
  }

  openDialog(element, action) {
    console.log(element);
    const dialogData = {
      model: element,
      action: action
    };

    const dialogRef = this.dialog.open(DialogStudentsComponent,
        {
          data: dialogData,
          width: '600px'
        }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllStudents();
    });
  }

}


