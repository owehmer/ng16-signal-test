import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-every-property-binding-entry',
  templateUrl: './every-property-binding-entry.component.html',
  styleUrls: ['./every-property-binding-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class EveryPropertyBindingEntryComponent implements OnChanges {
  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public counter!: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).some((change) => change.firstChange)) {
      console.log('FIRST CHANGE: EveryPropertyBindingEntryComponent on changes', changes);
    } else {
      console.warn('EveryPropertyBindingEntryComponent on changes', changes);
    }
  }
}
