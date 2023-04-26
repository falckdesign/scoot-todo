import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'app-task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.less']
})
export class TaskCardComponent {
	@Input() task!:Task;

	constructor(
		private taskService: TaskService
	){

	}

	OnClickDelete(task:Task){
		this.taskService.deleteTask(task);
	}
}
