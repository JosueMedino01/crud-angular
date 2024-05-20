import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../model/course';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService:CoursesService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private route:ActivatedRoute,
    public dialog: MatDialog
  ){
    this.onRefresh();
  }

  ngOnInit(){
  }

  onRefresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onMessage("Erro ao carregar cursos!");
        return of([]);
      })
    );
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit/', course._id], {relativeTo: this.route})
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja realmente deleter este curso?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.coursesService.remove(course._id).subscribe({
        next: () => {
          this.onRefresh();
          this.onMessage("Curso deletado com sucesso!");
        }
      });
    });

  }

  onMessage(message: string){
    this._snackBar.open(message, "OK", {
      horizontalPosition:'left',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }
}
