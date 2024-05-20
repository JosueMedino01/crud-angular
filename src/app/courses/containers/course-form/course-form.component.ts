import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{
  formCourse = this.formBuilder.group({
    _id: [''],
    name: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]
    ],
    category: ['', Validators.required],
  })


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private couserService: CoursesService,
    private _snackBar: MatSnackBar,
    private location:Location,
    private route:ActivatedRoute
  ){
  }

  ngOnInit(): void {
      const course: Course = this.route.snapshot.data['course'];
      this.formCourse.setValue({
        _id: course._id,
        name: course.name,
        category: course.category,
      })
      console.log(course)
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

  getErrorMesssage(fieldName: string){
    const field = this.formCourse.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo Obrigatório'
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa de ser ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo é de ${requiredLength} caracteres.`;
    }
    return 'Campo Inváldo';
  }
}
