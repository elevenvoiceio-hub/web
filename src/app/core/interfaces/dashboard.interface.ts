export interface IAdminStats {
    users:           IUsers;
    voices:          IModels;
    service_request: IServiceRequest;
    models:          IModels;
}

export interface IModels {
    active: number;
}

export interface IServiceRequest {
    open: number;
}

export interface IUsers {
    active:           number;
    total_subscribed: number;
    total:            number;
    today_subscribed: number;
    week_subscribed:  number;
}
