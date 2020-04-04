import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ContactInfo } from '../interfaces/contacts.interface';
import { WorldStats } from '../interfaces/stats.interface';
import { NewsData } from '../interfaces/news.interface';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  endpoint = environment.data_url;
  statesEndpoint = environment.states_url;
  contactsEndpoint = environment.contact_url;
  worldStatsEndpoint = environment.world_stats_url;
  news_url = environment.news_url;
  constructor(private http: HttpClient) {}

  getWorldStats() {
    return this.http.get<WorldStats>(this.worldStatsEndpoint);
  }
  getLatestData() {
    return this.http.get<any>(this.endpoint).pipe(shareReplay(1));
  }
  getStateData() {
    return this.http.get<any>(this.statesEndpoint).pipe(shareReplay(1));
  }

  getStateWiseData() {
    return this.getStateData().pipe(
      map(states => states.filter(item => item.state !== 'Total'))
    );
  }

  getTotalStatus() {
    return this.getLatestData().pipe(
      map(data => data[0]),
      map((data: any) => {
        return [
          {
            label: 'active',
            value: data.pending
          },
          {
            label: 'confirmed',
            value: data.positive
          },
          {
            label: 'deaths',
            value: data.death
          },
          {
            label: 'recovered',
            value: data.recovered
          }
        ];
      })
    );
  }

  getContactDetails() {
    return this.http.get<ContactInfo>(this.contactsEndpoint).pipe(shareReplay(1));
  }

  getPrimaryContactDetails() {
    return this.getContactDetails().pipe(map(data => data.data.contacts.primary));
  }

  getContactDetailsOfState(state: string) {
    return this.getContactDetails().pipe(
      map(data => {
        return data.data.contacts.regional.find(region => region.loc === state);
      })
    );
  }

  getStateInformation(state) {
    return this.getStateData().pipe(
      map(states => states.find(item => item.state === state))
    );
  }

  getNews() {
    return this.http.get<NewsData>(this.news_url);
  }
}
