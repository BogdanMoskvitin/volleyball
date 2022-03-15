export interface Event {
    id: number;
    time: string;
    location: string;
    price: number
}

export interface Participation {
    status: boolean;
}

export interface Guest {
    name?: string;
    id?: number;
    phone?: string;
    email?: string;
}