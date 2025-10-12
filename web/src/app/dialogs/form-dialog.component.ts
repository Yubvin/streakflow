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
  template: `
    <ui-dialog-content class="sm:max-w-[425px]">
      <ui-dialog-header>
        <ui-dialog-title>Edit Profile</ui-dialog-title>
        <ui-dialog-description>
          Make changes to your profile here. Click save when you're done.
        </ui-dialog-description>
      </ui-dialog-header>
      
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <ui-label for="name">Name</ui-label>
          <ui-input id="name" [(ngModel)]="name" placeholder="Your name" />
        </div>
        
        <div class="space-y-2">
          <ui-label for="email">Email</ui-label>
          <ui-input id="email" type="email" [(ngModel)]="email" placeholder="your@email.com" />
        </div>
      </div>
      
      <ui-dialog-footer>
        <ui-button variant="outline" (click)="close()">Cancel</ui-button>
        <ui-button (click)="save()">Save changes</ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  `,
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

