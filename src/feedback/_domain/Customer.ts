import { Feedback } from './Feedback';

export interface Customer {
    id: string;
    name: string;
    photo: string | null;
    feedbackList: Feedback[],
}
