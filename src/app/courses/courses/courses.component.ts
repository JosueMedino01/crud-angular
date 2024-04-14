import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../model/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService:CoursesService,
    private _snackBar: MatSnackBar,
  ){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        _snackBar.open("Erro ao carregar cursos!", "OK", {
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
        return of([]);
      })
    );
  }

  ngOnInit(){
  }
}
