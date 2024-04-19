import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  formCourse!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private couserService: CoursesService,
    private _snackBar: MatSnackBar,
  ){
    this.formCourse = this.formBuilder.group({
      name: [null],
      category: [null],
    })
  }

  onSubmit(){
    this.couserService.save(this.formCourse.value).subscribe(
      data => console.log(data),

      error => this.onError(error),
    );
  }

  onCancel(){

  }

  onError(error: any){
    this._snackBar.open(`Problema ao salvar curso. Erro ${error.status}`,"OK", {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration:5000
    })
  }
}
