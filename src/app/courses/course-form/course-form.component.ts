import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  formCourse!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formCourse = this.formBuilder.group({
      name: [null],
      category: [null],
    })
  }

  onSubmit(){
  }

  onCancel(){

  }
}
