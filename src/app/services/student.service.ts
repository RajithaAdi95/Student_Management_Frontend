import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Student } from './student.model';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  displayed_student_columns: string[] = ['student_name', 'intake', 'joined_date', 'action', 'more'];
  student_table_data: any = [];
  student_data_source = new MatTableDataSource(this.student_table_data);
  constructor(
    private form_builder: FormBuilder,
    private http: HttpClient
  ) { }

  readonly baseUrl = 'http://localhost:3000';
  list: Student[] = [];

  studentForm = this.form_builder.group({
    _id: [''],
    student_name: ['', Validators.required],
    intake: ['', Validators.required],
    joined_date: [''],
    courses: ['', Validators.required]
  })

  addStudent() {
    return this.http.post(`${this.baseUrl}/students`, this.studentForm.value)
  }

  deleteStudent(stu_id: string) {
    return this.http.delete(`${this.baseUrl}/students/${stu_id}`)
  }

  getAllStudents() {
    return this.http.get(`${this.baseUrl}/students`)
    .subscribe((data) => {
      this.list = data as Student[];
      this.student_table_data = (this.list)
    })
  }

  updateStudent() {
    return this.http.put(`${this.baseUrl}/students/${this.studentForm.get('_id')?.value}`, this.studentForm.value)
  }
}
