export interface IFeedback {
    ticket_id:  number;
    created_by: string;
    status:     string;
    category:   string;
    subject:    string;
    priority:   string;
    created_on: Date;
}
