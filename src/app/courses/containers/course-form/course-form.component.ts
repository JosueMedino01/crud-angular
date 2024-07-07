import { Course, Lesson } from './../../model/course';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../../services/courses.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{
  formCourse!: FormGroup;


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private couserService: CoursesService,
    private _snackBar: MatSnackBar,
    private location:Location,
    private route:ActivatedRoute,
    public formUtils: FormUtilsService
  ){
  }

  ngOnInit(): void {
      const course: Course = this.route.snapshot.data['course'];

      this.formCourse = this.formBuilder.group({
        _id: [course._id],
        name: [course.name,
          [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]
        ],
        category: [course.category, Validators.required],
        lessons: this.formBuilder.array(this.retriveLessons(course), Validators.required),
      })
  }

  private retriveLessons(course: Course){
    let lessons = []

    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }


  private createLesson(lesson: Lesson = {id: '', name: '', youtubeURL: ''}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]
      ],
      youtubeURL: [lesson.youtubeURL,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]]
    });
  }

  onSubmit(){
   if(this.formCourse.valid){
    this.couserService.save(this.formCourse.value).subscribe({
      next:(data:Course) => {
      this.onSuccess();
      },

      error:(error:any) => {
        this.onError(error)
      },
    });
   } else{
     this.formUtils.validateAllFormField(this.formCourse);
   }
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.formCourse.get('lessons')).controls;

  }

  addNewLesson(){
    const lessons = this.formCourse.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  deleteLesson(index: number){
    const lessons = this.formCourse.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
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
