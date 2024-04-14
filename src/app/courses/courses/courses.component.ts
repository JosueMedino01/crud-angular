import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private coursesService:CoursesService){
    this.courses$ = this.coursesService.list();
  }

  ngOnInit(){
  }
}
