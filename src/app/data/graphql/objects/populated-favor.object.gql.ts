import { AddressObjectGQL } from "./address.object.gql";
import { CategoryObjectGQL } from "./category.object.gql";
import { UserObjectGQL } from "./user.object.gql";

export class PopulatedFavorObjectGQL {
    _id?: string;
    categoryId?: CategoryObjectGQL[];
    dateCreated?: Date;
    dateLastModified?: Date;
    dateLockedOut?: Date;
    dateToExecute?: Date;
    dateToFinishExecute?: Date;
    dateToPublish?: Date;
    description?: string;
    destinationAddress?: AddressObjectGQL;
    imagesPath?: Array<string>;
    numOfPeopleNeeded?: number;
    ownerId?: UserObjectGQL;
    paymentAmount?: number;
    paymentMethod?: string;
    sourceAddress?: AddressObjectGQL;
    status?: string;

    getCategoriesTitle() {
        if (!this.categoryId)
            return '';

        if (this.categoryId && this.categoryId![0].parentCategory)
            return (this.categoryId![0].parentCategory.name + ': ' + this.categoryId![0].name);
        else
            return this.categoryId![0].name;
    }

}