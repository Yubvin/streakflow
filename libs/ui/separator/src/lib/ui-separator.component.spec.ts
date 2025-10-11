import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSeparatorComponent } from './ui-separator.component';

describe('UiSeparatorComponent', () => {
  let component: UiSeparatorComponent;
  let fixture: ComponentFixture<UiSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
