import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StaffModel} from '../model/staff.model';

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private readonly USER_CONTROL = '/api/private/v1/staff';

    constructor(private http: HttpClient) {
    }

    getAllStaff(): Observable<any> {
        return this.http.get(`${this.USER_CONTROL}/all`);
    }

    createStaff(staffModel: StaffModel): Observable<any> {
        return this.http.post(`${this.USER_CONTROL}`, staffModel);
    }

    deleteStaff(id: number): Observable<any> {
        return this.http.delete(`${this.USER_CONTROL}/id/` + id);

    }
}
