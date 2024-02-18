import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCDevLibComponent } from './app-cdev-lib.component';

describe('AppCDevLibComponent', () => {
  let component: AppCDevLibComponent;
  let fixture: ComponentFixture<AppCDevLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCDevLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCDevLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
