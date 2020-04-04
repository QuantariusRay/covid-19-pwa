import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss']
})
export class UsMapComponent implements OnInit {
  @Input() selectedState: string;
  constructor() {}

  ngOnInit(): void {
    console.log({ state: this.selectedState });
  }
}
