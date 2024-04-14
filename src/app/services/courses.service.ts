import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../courses/model/course';
import { delay, first, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = './aassets/courses.json';

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        delay(5000),
        first(),
      );
  }
}
