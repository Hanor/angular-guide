import { MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatBadgeModule,
    MatIconRegistry, MatToolbarModule, MatSidenavModule, MatButtonModule, MatButtonToggleModule,
    MatSelectModule, MatProgressBarModule, MatMenuModule, MatCardModule, MatDialogModule, 
    MatTooltipModule, MatExpansionModule, MatProgressSpinnerModule, MatSlideToggleModule, MatBottomSheetModule, MatPaginatorModule} from '@angular/material'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    
@NgModule({
    imports: [
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatBottomSheetModule,
        MatPaginatorModule
    ],
    exports: [
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatButtonToggleModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressBarModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatBottomSheetModule,
        MatPaginatorModule
    ]
})
export class AppMaterialModule {
    constructor(
        public matIconRegistry: MatIconRegistry) {
        matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }
}