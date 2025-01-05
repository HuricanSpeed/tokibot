import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildBansComponent } from './guild-bans.component';

describe('GuildBansComponent', () => {
  let component: GuildBansComponent;
  let fixture: ComponentFixture<GuildBansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildBansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuildBansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
