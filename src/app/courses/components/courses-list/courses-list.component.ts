import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];


  constructor(){}

  onAdd(){
    this.add.emit(true);
  }

}
