import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  
  constructor(
    public student_service: StudentService
  ) { }

  ngOnInit(): void {
    this.student_service.getAllStudents();
  }

}
