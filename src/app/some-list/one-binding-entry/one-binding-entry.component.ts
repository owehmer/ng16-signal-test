import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SomeListEntryViewmodel } from "../models";

@Component({
  selector: 'app-one-binding-entry',
  templateUrl: './one-binding-entry.component.html',
  styleUrls: ['./one-binding-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class OneBindingEntryComponent implements OnChanges {
  @Input({ required: true })
  public entry!: SomeListEntryViewmodel;

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).some((change) => change.firstChange)) {
      console.log('FIRST CHANGE: OneBindingEntryComponent on changes', changes);
    } else {
      console.warn('OneBindingEntryComponent on changes', changes);
    }
  }
}
