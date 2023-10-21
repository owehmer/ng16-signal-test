import { Injectable } from '@angular/core';
import { interval, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SomeListDataService {

  constructor() { }

  public async getPromiseData() {
    const data = await new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['first', 'second']);
      }, 2000)
    });

    return data;
  }

  public async getCorruptPromiseData() {
    const data = await new Promise<string[]>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Something unexpected happened. For real!'));
      }, 2000)
    });

    return data;
  }

  public getObsData() {
    const data$ = new Observable<string[]>((subscriber) => {
      const data: string[] = [];

      setTimeout(() => {
        data.push('first obs');
        subscriber.next(data);
      }, 1000);

      setTimeout(() => {
        interval(500).subscribe((val) => {
          data.push(`${val} obs`);
          subscriber.next(data);
        })
      }, 1500);
    });

    return data$;
  }
}
