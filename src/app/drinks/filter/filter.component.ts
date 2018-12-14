import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.scss']
  })
  export class FilterComponent implements OnInit {
    filter: FormGroup;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<FilterComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {}

    ngOnInit() {
        this.filter = this.data;
    }
    
    eventClose(toFilter) {
      this.bottomSheetRef.dismiss(toFilter);
    }
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }