import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [
    {_id: '01', name: 'CRUD Spring + Angular', category: 'FullStack'}
  ];
  displayedColumns = ['name', 'category'];
}
