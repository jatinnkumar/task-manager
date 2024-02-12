export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'completed' | 'incomplete';
    dueTimestamp: string;
}
