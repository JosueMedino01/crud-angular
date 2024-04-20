import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../courses/model/course';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        delay(1200),
        first(),
      );
  }

  save(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  findById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }
}
