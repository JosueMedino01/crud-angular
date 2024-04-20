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
    if(record._id){
      return this.update(record);
    }

    return this.create(record);
  }

  findById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, {record}).pipe(first());
  }
}
