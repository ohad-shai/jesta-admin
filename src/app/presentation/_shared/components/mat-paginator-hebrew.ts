import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MatPaginatorHebrew implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = "עמוד ראשון";
    lastPageLabel = "עמוד אחרון";
    nextPageLabel = "עמוד הבא";
    previousPageLabel = "עמוד קודם";
    itemsPerPageLabel = "פריטים בעמוד:";

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return "עמוד 1 מתוך 1";
        }
        const amountPages = Math.ceil(length / pageSize);
        return `עמוד ${page + 1} מתוך ${amountPages}`;
    }
}
