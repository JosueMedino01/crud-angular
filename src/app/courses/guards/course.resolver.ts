import { CoursesService } from './../../services/courses.service';
import { ResolveFn } from '@angular/router';
import { Course } from '../model/course';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (route, state, coursesService: CoursesService = inject(CoursesService)) => {


  if(route.params && route.params['id']){
    return coursesService.findById(route.params['id']);
  }
  return of({_id: '', name: '', category: ''});

};
