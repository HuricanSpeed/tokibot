import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildFunnyComponent } from './guild-funny.component';

describe('GuildFunnyComponent', () => {
  let component: GuildFunnyComponent;
  let fixture: ComponentFixture<GuildFunnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildFunnyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuildFunnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
