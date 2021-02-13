import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchesDoneComponent } from './single-matches-done.component';

describe('SingleMatchesDoneComponent', () => {
  let component: SingleMatchesDoneComponent;
  let fixture: ComponentFixture<SingleMatchesDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchesDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchesDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
