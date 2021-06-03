import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentsModel} from '../model/students.model';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    private readonly USER_CONTROL = '/api/private/v1/student';

    constructor(private http: HttpClient) {
    }

    getAllStudents(): Observable<any> {
        return this.http.get(`${this.USER_CONTROL}/all`);
    }

    createStudents(studentsModel: StudentsModel): Observable<any> {
        return this.http.post(`${this.USER_CONTROL}`, studentsModel);
    }

    deleteStudents(id: number): Observable<any> {
        return this.http.delete(`${this.USER_CONTROL}/id/` + id);

    }
}
