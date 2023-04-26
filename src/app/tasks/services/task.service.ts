import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
	providedIn: 'root'
})
export class TaskService {

	private taskDatabase$:BehaviorSubject<any> = new BehaviorSubject([]);

	constructor(
		private httpClient: HttpClient
	) { }



	//#region FUNCTIONS

	public getTasks():BehaviorSubject<Task[]>{

		if(!this.taskDatabase$?.getValue().length){
			this.httpClient.get("assets/json/tasks.json").subscribe({
				next:(result)=>{
					let taskList:Task[] = Object.values(result);
					this.taskDatabase$.next(taskList);
				},
				error:(e)=>{
					throw e.error;
				}
			});
		}

		return this.taskDatabase$;
	}

	public addTask(Task:Task):BehaviorSubject<string> {
		let statusResponse:BehaviorSubject<string> = new BehaviorSubject('');
		let taskList:Task[] = this.taskDatabase$.getValue();

		taskList.unshift(Task);
		this.taskDatabase$.next(taskList);
		statusResponse.next('ok');

		return statusResponse;
	}

	public deleteTask(Task:Task):BehaviorSubject<string> {
		let statusResponse:BehaviorSubject<string> = new BehaviorSubject('');
		let taskList:Task[] = this.taskDatabase$.getValue();

		let taskIndex = taskList.indexOf(Task);
		taskList.splice(taskIndex,1);
		this.taskDatabase$.next(taskList);
		statusResponse.next('ok');

		return statusResponse;
	}

	//#endregion
}
