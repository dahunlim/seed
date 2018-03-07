import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AramPagingComponent } from './aram-paging.component.ts';

describe('AramPagingComponent', () => {
  let component: AramPagingComponent;
  let fixture: ComponentFixture<AramPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AramPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AramPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
