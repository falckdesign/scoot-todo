import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
@Pipe({
	name: 'priorityBadge'
})
export class PriorityPipe implements PipeTransform {

	transform(item: Task, ...args: unknown[]): string {
		let itemCss: string = '';
		switch(item.PRIORITY){
			case '':
			default:
				itemCss = 'text-bg-light';
				break;
			case 'low':
				itemCss = 'text-bg-success';
				break;
			case 'high':
				itemCss = 'text-bg-warning';
				break;
			case 'critical':
				itemCss = 'text-bg-danger';
				break;
		}

		return itemCss;
	}

}
