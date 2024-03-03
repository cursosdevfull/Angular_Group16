import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSignalsComponent } from './app-signals.component';

describe('AppSignalsComponent', () => {
  let component: AppSignalsComponent;
  let fixture: ComponentFixture<AppSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSignalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
