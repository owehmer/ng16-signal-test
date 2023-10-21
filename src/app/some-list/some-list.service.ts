import { DestroyRef, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SomeListEntryViewmodel, SomeListViewmodel } from "./models";
import { interval, Observable, Subscription } from "rxjs";
import { SomeListDataService } from "./some-list-data.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class SomeListService {
  public readonly viewmodel: Signal<SomeListViewmodel>;
  private readonly _viewmodel: WritableSignal<SomeListViewmodel>;

  private obsTest$$: Subscription | undefined;

  constructor(private readonly someListDataService: SomeListDataService, private readonly destroyRef: DestroyRef) {
    this._viewmodel = signal(this.getVmInitState());
    this.viewmodel = this._viewmodel.asReadonly();
  }

  public initObservableTest() {
    this.resetViewModelStateToZero();

    this.setVmToLoading();

    const data$ = this.someListDataService.getObsData();

    this.obsTest$$ = data$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this._viewmodel.update((currValue) => {
        return {
          ...currValue,
          isLoading: false,
          entries: data.map((entryTitle) => {
            return this.createVmEntry(currValue.entries ?? [], entryTitle);
          })
        }
      })
    })
  }

  public async initPromiseTest() {
    this.resetViewModelStateToZero();

    this.setVmToLoading();

    const data = await this.someListDataService.getPromiseData();

    this._viewmodel.update((currValue) => {
      return {
        ...currValue,
        isLoading: false,
        entries: data.map((entryTitle) => {
          return this.createVmEntry(currValue.entries ?? [], entryTitle);
        })
      }
    })
  }

  private resetViewModelStateToZero() {
    this.obsTest$$?.unsubscribe();
    this._viewmodel.set(this.getVmInitState());
  }

  private getVmInitState(): SomeListViewmodel {
    return {
      headline: 'Unknown',
      entries: undefined,
      isLoading: false
    }
  }

  private createVmEntry(currEntries: SomeListEntryViewmodel[], entryTitle: string) {
    const existingEntry = currEntries?.find((entry) => entry.name === entryTitle);
    return {
      name: entryTitle,
      counter: (existingEntry?.counter ?? 0),
      onClick: () => this.increaseCounter(entryTitle)
    }
  }

  private setVmToLoading() {
    this._viewmodel.update((currentData) => ({
      ...currentData,
      isLoading: true
    }));
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
