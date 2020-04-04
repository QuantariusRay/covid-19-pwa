import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../common/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-state-detail',
  templateUrl: './state-detail.component.html',
  styleUrls: ['./state-detail.component.scss']
})
export class StateDetailComponent implements OnInit {
  stateData$: Observable<any>;

  searchTerm: FormControl;

  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const state = this.getCurrentStateFromURL();
    if (state) {
      this.stateData$ = this.getAllDetailsForState(state);
    }
  }

  getAllDetailsForState(state) {
    return this.httpService.getStateInformation(state);
  }

  private getCurrentStateFromURL() {
    return this.activatedRoute.snapshot.params['state'];
  }

  private getContactDetailsForState(state: string) {
    return this.httpService.getContactDetailsOfState(state);
  }
}
