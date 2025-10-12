import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})
export class UiDialogService {
  readonly dialog = inject(Dialog);
}

