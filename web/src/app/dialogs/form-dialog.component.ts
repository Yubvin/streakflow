import { Component, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { UiDialogContentComponent, UiDialogHeaderComponent, UiDialogTitleComponent, UiDialogDescriptionComponent, UiDialogFooterComponent } from '@streakflow/ui/dialog';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiLabelComponent } from '@streakflow/ui/label';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    UiDialogContentComponent,
    UiDialogHeaderComponent,
    UiDialogTitleComponent,
    UiDialogDescriptionComponent,
    UiDialogFooterComponent,
    UiButtonComponent,
    UiInputComponent,
    UiLabelComponent,
  ],
  templateUrl: './form-dialog.component.html',
})
export class FormDialogComponent {
  name = signal<string>('John Doe');
  email = signal<string>('john@example.com');

  constructor(public dialogRef: DialogRef) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('Saving:', this.name(), this.email());
    this.dialogRef.close({ name: this.name(), email: this.email() });
  }
}

