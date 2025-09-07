import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemPlaceholder } from './no-item-placeholder';

describe('NoItemPlaceholder', () => {
  let component: NoItemPlaceholder;
  let fixture: ComponentFixture<NoItemPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoItemPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoItemPlaceholder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
