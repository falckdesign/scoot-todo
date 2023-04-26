import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: any, filteredText:string = ''): BehaviorSubject<any> {
	//console.log('value: ', value);
	let filteredSubject:BehaviorSubject<any>;
	return value.subscribe({
		next:(taskList:Task[])=>{
			taskList = taskList.filter((task)=>{
				return task.DESCRIPTION.includes(filteredText) || task.PRIORITY.includes(filteredText);
			});
			return filteredSubject.next(taskList);
		}
	})
    //return filteredSubject;
  }

}
