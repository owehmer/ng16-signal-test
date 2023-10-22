import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { SomeListService } from "./some-list.service";
import { SomeListEntryViewmodel, SomeListViewmodel } from "./models";
import { CommonModule } from "@angular/common";
import { SomeListDataService } from "./some-list-data.service";

@Component({
  selector: 'app-some-list',
  templateUrl: './some-list.component.html',
  styleUrls: ['./some-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  providers: [SomeListService, SomeListDataService]
})
export class SomeListComponent {
  public readonly viewModel: Signal<SomeListViewmodel>;

  constructor(private readonly someListService: SomeListService) {
    this.viewModel = this.someListService.viewmodel;
  }

  public initPromiseTest() {
    this.someListService.initPromiseTest();
  }

  public initObservableTest() {
    this.someListService.initObservableTest();
  }

  public resetVm() {
    this.someListService.resetViewModelStateToZero();
  }

  public trackByName(_: number, entry: SomeListEntryViewmodel) {
    return entry.name;
  }
}
