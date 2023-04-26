import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PriorityPipe } from './pipes/priority.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskFilterPipe } from './pipes/task-filter.pipe';



@NgModule({
  declarations: [
    TaskCardComponent,
    TaskListComponent,
    PriorityPipe,
    TaskFilterPipe
  ],
  imports: [
    CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	ModalModule.forRoot(),
	BsDatepickerModule.forRoot(),
  ]
})
export class TasksModule { }
