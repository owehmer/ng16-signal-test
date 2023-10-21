export interface SomeListViewmodel {
  headline: string;
  entries: SomeListEntryViewmodel[] | undefined;
  showEntryLoadingIndicator: boolean;
  showGlobalLoadingIndicator: boolean;
}

export interface SomeListEntryViewmodel {
  name: string;
  counter: number;
  onClick: () => void;
}
