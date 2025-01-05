import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildTicketsComponent } from './guild-tickets.component';

describe('GuildTicketsComponent', () => {
  let component: GuildTicketsComponent;
  let fixture: ComponentFixture<GuildTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuildTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
