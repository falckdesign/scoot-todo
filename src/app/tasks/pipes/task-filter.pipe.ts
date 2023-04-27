import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: any, filteredText:string = ''): any {
	if (value.length === 0 || !filteredText) {
		return value;
	}
	filteredText = filteredText.toLowerCase();
	return value.filter((task:Task)=>{
		return task.DESCRIPTION.toLowerCase().indexOf(filteredText) !== -1 || task.PRIORITY.toLowerCase().indexOf(filteredText) !== -1;
	})

  }

}
