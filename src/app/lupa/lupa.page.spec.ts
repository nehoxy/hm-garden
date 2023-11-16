import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LupaPage } from './lupa.page';

describe('LupaPage', () => {
  let component: LupaPage;
  let fixture: ComponentFixture<LupaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LupaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
