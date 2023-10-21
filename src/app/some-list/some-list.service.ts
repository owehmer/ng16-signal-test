import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SomeListEntryViewmodel, SomeListViewmodel } from "./models";

@Injectable()
export class SomeListService {
  public readonly viewmodel: Signal<SomeListViewmodel>;
  private readonly _viewmodel: WritableSignal<SomeListViewmodel>;

  constructor() {
    this._viewmodel = signal({
      headline: 'Unknown',
      entries: undefined,
      isLoading: false
    });
    this.viewmodel = this._viewmodel.asReadonly();
  }

  public async initViewModelOnce() {
    this._viewmodel.update((currentData) => ({
      ...currentData,
      isLoading: true
    }));

    const data = await new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['first', 'second']);
      }, 2000)
    });

    this._viewmodel.update((currValue) => {
      return {
        ...currValue,
        isLoading: false,
        entries: data.map((entryTitle) => {
          const existingEntry = currValue.entries?.find((entry) => entry.name === entryTitle);
          return {
            name: entryTitle,
            counter: (existingEntry?.counter ?? 0),
            onClick: () => this.increaseCounter(entryTitle)
          }
        })
      }
    })
  }

  private increaseCounter(title: string) {
    this._viewmodel.update((currentData) => {
      const existingEntryIndex = currentData.entries?.findIndex((entry) => entry.name === title) ?? -1;

      if (existingEntryIndex === -1 || !currentData.entries || (currentData.entries?.length ?? 0) === 0) {
        return currentData;
      }

      return {
        ...currentData,
        entries: [
          ...currentData.entries.slice(0, existingEntryIndex),
          {
            ...currentData.entries[existingEntryIndex],
            counter: currentData.entries[existingEntryIndex].counter + 1
          },
          ...currentData.entries.slice(existingEntryIndex + 1)
        ]
      }
    })
  }
}
