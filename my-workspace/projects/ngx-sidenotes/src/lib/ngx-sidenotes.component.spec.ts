import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSidenotesComponent } from './ngx-sidenotes.component';

describe('NgxSidenotesComponent', () => {
  let component: NgxSidenotesComponent;
  let fixture: ComponentFixture<NgxSidenotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSidenotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSidenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
