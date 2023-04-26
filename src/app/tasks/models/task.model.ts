export interface Task {
	DESCRIPTION: string,
	DUE_DATE: Date,
	PRIORITY: 'low' | '' | 'high' | 'critical'
}
