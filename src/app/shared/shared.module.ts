import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';



@NgModule({
  declarations: [
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    CategoryPipe,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
