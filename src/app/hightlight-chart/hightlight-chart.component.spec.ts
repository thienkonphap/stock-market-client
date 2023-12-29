import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HightlightChartComponent } from './hightlight-chart.component';

describe('HightlightChartComponent', () => {
  let component: HightlightChartComponent;
  let fixture: ComponentFixture<HightlightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HightlightChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HightlightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
