export interface IAnswer {
    answerId: number;
    type: string;
    account: {
        name: string;
        email: string;
    };
    content: string;
    heartCount: number;
    createdAt: string; // string / Date
    modifiedAt: string;
}
