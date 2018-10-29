import { Observable } from 'rxjs/Observable';


export interface Checklist {
    id: string;
    title: string;
    items: ChecklistItem[];
}

export interface ChecklistItem {
    title: string;
    checked: boolean;
    priority:number;
}