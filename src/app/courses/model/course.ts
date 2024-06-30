export interface Course {
  _id:string;
  name:string;
  category: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  name: string;
  youtubeURL: string;
}
