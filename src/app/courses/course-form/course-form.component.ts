import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  formCourse = this.formBuilder.group({
    name: [''],
    category: [''],
  })


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private couserService: CoursesService,
    private _snackBar: MatSnackBar,
    private location:Location
  ){
  }

  onSubmit(){
    this.couserService.save(this.formCourse.value).subscribe({
      next:(data:Course) => {
      this.onSuccess();
      },

      error:(error:any) => {
        this.onError(error)
      },
    });
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this._snackBar.open(`Curso cadastrado com sucesso!`,"", {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration:5000
    })

    this.location.back();
  }

  private onError(error: any){
    this._snackBar.open(`Problema ao salvar curso. Erro ${error.status}`,"OK", {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration:5000
    })
  }
}
