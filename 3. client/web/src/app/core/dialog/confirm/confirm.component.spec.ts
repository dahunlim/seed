import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AramDialogComponent } from './confirm.component';

describe('AramDialogComponent', () => {
  let component: AramDialogComponent;
  let fixture: ComponentFixture<AramDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AramDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
