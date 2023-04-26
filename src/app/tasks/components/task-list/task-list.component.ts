import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
	public addTaskForm!: FormGroup;
	public taskList: Task[] = [];
	public taskList$: BehaviorSubject<any> = new BehaviorSubject([]);
	public searchText!: string;
	modalRef?: BsModalRef;
	minTaskDate:Date = new Date();

	constructor(
		private taskService: TaskService,
		private modalService: BsModalService
	) { }


	ngOnInit() {
		this.loadTasks();
		this.createForm();
	}

	loadTasks() {
		this.taskService.getTasks().subscribe({
			next: (result) => {
				//console.log('result: ', result);
				this.taskList = result;
				this.taskList$.next(result);
			}
		});
	}

	filterTasks() {
		console.log('search: ', this.searchText);
	}

	clearSearch(){
		this.searchText = '';
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	createForm() {
		this.addTaskForm = new FormGroup({
			description: new FormControl('',[ Validators.required, Validators.minLength(5) ]),
			priority: new FormControl(''),
			dueDate:new FormControl(null,[ Validators.required ]),
		});
		this.configureDate();
	}

	configureDate(){
		let minDate:Date = new Date();
		this.minTaskDate.setDate(minDate.getDate() + 1);
	}
	onSubmitTask() {
		let newTask:Task = {
			DESCRIPTION : this.addTaskForm.get('description')?.value,
			PRIORITY: this.addTaskForm.get('priority')?.value,
			DUE_DATE: this.addTaskForm.get('dueDate')?.value
		}
		this.taskService.addTask(newTask).subscribe({
			next:(response)=>{
				if(response == 'ok'){
					this.modalRef?.hide();
				}else {
					throw response;
				}

			},
			error:(e)=>{
				throw e.error;
			}
		});
	}
}
