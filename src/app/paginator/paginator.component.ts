import { Component, OnInit, OnDestroy, Input, Output, EventEmitter  } from '@angular/core';
import { Paginator } from './paginator.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

    @Input('paginator') paginator: Paginator;
    @Input('offsetOptions') offsetOptions: Array<number>;
    @Output('change') change = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
    ngOnDestroy(): void {}
    eventPageChange(event: PageEvent): void {
        this.paginator.setOffset(event.pageSize);
        this.paginator.setPage(event.pageIndex + 1);
        this.paginator.setSize(event.length);
        this.change.emit(this.paginator);
    }
}
