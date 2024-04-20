import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../model/course';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]>;

  constructor(
    private coursesService:CoursesService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private route:ActivatedRoute,
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

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
