import { Injectable, Input } from "@angular/core";
import { ComponentMode } from "./component-mode";

/**
 * Represents a multi component which has modes for basic CRUD operations.
 * It allows to perform all CRUD operations on a single component.
 */
@Injectable()
export abstract class MultiComponent {

    @Input() mode: ComponentMode = ComponentMode.Create;

    public isCreateMode() {
        return (this.mode === ComponentMode.Create);
    }

    public isReadMode() {
        return (this.mode === ComponentMode.Read);
    }

    public isUpdateMode() {
        return (this.mode === ComponentMode.Update);
    }

    public isDeleteMode() {
        return (this.mode === ComponentMode.Delete);
    }

    public isNotCreateMode() {
        return (this.mode !== ComponentMode.Create);
    }

    public isNotReadMode() {
        return (this.mode !== ComponentMode.Read);
    }

    public isNotUpdateMode() {
        return (this.mode !== ComponentMode.Update);
    }

    public isNotDeleteMode() {
        return (this.mode !== ComponentMode.Delete);
    }

}