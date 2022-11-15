export interface Task {
  name: string;
  viewed?: boolean;
  description: string;
  status: 'new' | 'complete' | 'in progress' | 'on hold' | 'archived';
  entryDate?: string;
  completeDate?: string;
}

export default interface TaskList extends Array<Task> {}
