export class CategoryObjectGQL {
    _id?: string;
    dateLastModified?: Date;
    name?: string;
    parentCategory?: CategoryObjectGQL;

    public getFullName() {
        if (this.parentCategory)
            return (this.parentCategory.name + ': ' + this.name);
        else
            return this.name;
    }

}