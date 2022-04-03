export interface FavorTransactionObjectGQL {
    _id: string;
    dateAccepted: Date;
    dateCompleted: Date;
    dateCreated: Date;
    dateLastModified: Date;
    favorId: string;
    favorOwnerId: string;
    handledByUserId: string;
    handlerComment: string;
    ownerComment: string;
}