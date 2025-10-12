import { Component, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from '@streakflow/ui/button';
import { UiBadgeComponent } from '@streakflow/ui/badge';
import { UiSeparatorComponent } from '@streakflow/ui/separator';
import { UiAvatarComponent } from '@streakflow/ui/avatar';
import { UiSkeletonComponent } from '@streakflow/ui/skeleton';
import { UiInputComponent } from '@streakflow/ui/input';
import { UiProgressComponent } from '@streakflow/ui/progress';
import { UiProgressStepsComponent } from '@streakflow/ui/progress-steps';
import { UiLabelComponent } from '@streakflow/ui/label';
import { UiCardComponent, UiCardHeaderComponent, UiCardTitleComponent, UiCardDescriptionComponent, UiCardActionComponent, UiCardContentComponent, UiCardFooterComponent } from '@streakflow/ui/card';
import { UiAspectRatioComponent } from '@streakflow/ui/aspect-ratio';
import { UiTextareaComponent } from '@streakflow/ui/textarea';
import { UiCheckboxComponent } from '@streakflow/ui/checkbox';
import { UiRadioGroupComponent, UiRadioItemComponent } from '@streakflow/ui/radio-group';
import { UiSwitchComponent } from '@streakflow/ui/switch';
import { UiSliderComponent } from '@streakflow/ui/slider';
import { UiToggleComponent } from '@streakflow/ui/toggle';
import { UiToggleGroupComponent, UiToggleGroupItemComponent } from '@streakflow/ui/toggle-group';
import { UiTabsComponent, UiTabsListComponent, UiTabsTriggerComponent, UiTabsContentComponent } from '@streakflow/ui/tabs';
import { UiBreadcrumbComponent, UiBreadcrumbListComponent, UiBreadcrumbItemComponent, UiBreadcrumbLinkComponent, UiBreadcrumbPageComponent, UiBreadcrumbSeparatorComponent, UiBreadcrumbEllipsisComponent } from '@streakflow/ui/breadcrumb';
import { UiPaginationComponent, UiPaginationContentComponent, UiPaginationItemComponent, UiPaginationLinkComponent, UiPaginationPreviousComponent, UiPaginationNextComponent, UiPaginationEllipsisComponent } from '@streakflow/ui/pagination';
import { UiTooltipTriggerDirective } from '@streakflow/ui/tooltip';
import { UiHoverCardTriggerDirective } from '@streakflow/ui/hover-card';
import { UiPopoverTriggerDirective, UiPopoverContentComponent } from '@streakflow/ui/popover';
import { UiDropdownMenuTriggerDirective, UiDropdownMenuContentComponent, UiDropdownMenuItemComponent, UiDropdownMenuSeparatorComponent, UiDropdownMenuLabelComponent } from '@streakflow/ui/dropdown-menu';
import { UiContextMenuTriggerDirective, UiContextMenuContentComponent, UiContextMenuItemComponent, UiContextMenuSeparatorComponent, UiContextMenuLabelComponent } from '@streakflow/ui/context-menu';
import { UiSelectTriggerDirective, UiSelectContentComponent, UiSelectItemComponent, UiSelectGroupComponent, UiSelectLabelComponent } from '@streakflow/ui/select';
import { UiMenubarComponent, UiMenubarMenuComponent, UiMenubarTriggerDirective, UiMenubarContentComponent, UiMenubarItemComponent, UiMenubarSeparatorComponent, UiMenubarLabelComponent, UiMenubarShortcutComponent, UiMenubarCheckboxItemComponent, UiMenubarRadioGroupComponent, UiMenubarRadioItemComponent, UiMenubarSubComponent, UiMenubarSubTriggerDirective, UiMenubarSubContentComponent } from '@streakflow/ui/menubar';
import { UiDialogService } from '@streakflow/ui/dialog';
import { BasicDialogComponent } from './dialogs/basic-dialog.component';
import { FormDialogComponent } from './dialogs/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog.component';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center justify-center bg-zinc-200 text-zinc-700 rounded-sm"
      [style.width.rem]="size() / 4"
      [style.height.rem]="size() / 4"
    >
      <small>{{ name() }}</small>
    </span>
  `,
})
export class AppIcon {
  readonly name = input<string>('');
  readonly size = input<number>(16);
}

@Component({
  imports: [FormsModule, RouterModule, AppIcon, UiButtonComponent, UiBadgeComponent, UiSeparatorComponent, UiAvatarComponent, UiSkeletonComponent, UiInputComponent, UiProgressComponent, UiProgressStepsComponent, UiLabelComponent, UiCardComponent, UiCardHeaderComponent, UiCardTitleComponent, UiCardDescriptionComponent, UiCardActionComponent, UiCardContentComponent, UiCardFooterComponent, UiAspectRatioComponent, UiTextareaComponent, UiCheckboxComponent, UiRadioGroupComponent, UiRadioItemComponent, UiSwitchComponent, UiSliderComponent, UiToggleComponent, UiToggleGroupComponent, UiToggleGroupItemComponent, UiTabsComponent, UiTabsListComponent, UiTabsTriggerComponent, UiTabsContentComponent, UiBreadcrumbComponent, UiBreadcrumbListComponent, UiBreadcrumbItemComponent, UiBreadcrumbLinkComponent, UiBreadcrumbPageComponent, UiBreadcrumbSeparatorComponent, UiBreadcrumbEllipsisComponent, UiPaginationComponent, UiPaginationContentComponent, UiPaginationItemComponent, UiPaginationLinkComponent, UiPaginationPreviousComponent, UiPaginationNextComponent, UiPaginationEllipsisComponent, UiTooltipTriggerDirective, UiHoverCardTriggerDirective, UiPopoverTriggerDirective, UiPopoverContentComponent, UiDropdownMenuTriggerDirective, UiDropdownMenuContentComponent, UiDropdownMenuItemComponent, UiDropdownMenuSeparatorComponent, UiDropdownMenuLabelComponent, UiContextMenuTriggerDirective, UiContextMenuContentComponent, UiContextMenuItemComponent, UiContextMenuSeparatorComponent, UiContextMenuLabelComponent, UiSelectTriggerDirective, UiSelectContentComponent, UiSelectItemComponent, UiSelectGroupComponent, UiSelectLabelComponent, UiMenubarComponent, UiMenubarMenuComponent, UiMenubarTriggerDirective, UiMenubarContentComponent, UiMenubarItemComponent, UiMenubarSeparatorComponent, UiMenubarLabelComponent, UiMenubarShortcutComponent, UiMenubarCheckboxItemComponent, UiMenubarRadioGroupComponent, UiMenubarRadioItemComponent, UiMenubarSubComponent, UiMenubarSubTriggerDirective, UiMenubarSubContentComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly loading = signal(false);

  // Switch states
  switchStates = {
    basic: false,
    darkMode: false,
    notifications: true,
  };

  // Toggle states
  toggleStates = {
    bold: false,
    italic: false,
    underline: false,
  };

  // Editor states
  editorStates = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  };

  // Toggle Group states
  toggleGroupStates = {
    alignment: 'left' as string | undefined,
    view: 'list' as string | undefined,
    fontSize: 'md' as string | undefined,
  };

  // Slider states
  sliderStates = {
    basic: 50,
    volume: 50,
    steps: 10000,
    brightness: 80,
    difficulty: 2,
    duration: 30,
  };

  // Tab states
  tabStates = {
    basic: 'account',
    stats: 'overview',
  };

  toggleLoading() {
    this.loading.update((v) => !v);
  }

  onToggleChange(type: string, value: boolean) {
    console.log(`Toggle ${type} changed to:`, value);
  }

  onDropdownAction(action: string) {
    console.log(`Dropdown action:`, action);
  }

  onContextAction(action: string) {
    console.log(`Context menu action:`, action);
  }

  // Select state management
  selectedCountry = signal<string>('');
  selectedFramework = signal<string>('');

  onCountryChange(value: string) {
    this.selectedCountry.set(value);
    console.log('Country selected:', value);
  }

  onFrameworkChange(value: string) {
    this.selectedFramework.set(value);
    console.log('Framework selected:', value);
  }

  // Theme management
  darkMode = signal<boolean>(false);

  toggleTheme() {
    const root = document.documentElement;
    if (this.darkMode()) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  }

  // Menubar state
  showSidebar = signal<boolean>(true);
  showStatusBar = signal<boolean>(true);
  viewMode = signal<'default' | 'compact' | 'expanded'>('default');

  onMenubarAction(action: string) {
    console.log(`Menubar action:`, action);
  }

  setViewMode(mode: string) {
    this.viewMode.set(mode as 'default' | 'compact' | 'expanded');
    console.log(`View mode changed to:`, mode);
  }

  // Dialog management
  private dialogService = new UiDialogService();

  openBasicDialog() {
    const dialogRef = this.dialogService.dialog.open(BasicDialogComponent, {
      panelClass: 'ui-dialog-panel',
      backdropClass: 'ui-dialog-backdrop',
    });

    dialogRef.closed.subscribe(result => {
      console.log('Basic dialog closed', result);
    });
  }

  openFormDialog() {
    const dialogRef = this.dialogService.dialog.open(FormDialogComponent, {
      panelClass: 'ui-dialog-panel',
      backdropClass: 'ui-dialog-backdrop',
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('Form saved:', result);
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialogService.dialog.open(DeleteDialogComponent, {
      panelClass: 'ui-dialog-panel',
      backdropClass: 'ui-dialog-backdrop',
    });

    dialogRef.closed.subscribe(confirmed => {
      if (confirmed) {
        console.log('Habit deleted!');
      }
    });
  }
}
