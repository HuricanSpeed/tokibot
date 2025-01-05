import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelIdComponent } from './panel-id.component';

describe('PanelIdComponent', () => {
  let component: PanelIdComponent;
  let fixture: ComponentFixture<PanelIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
