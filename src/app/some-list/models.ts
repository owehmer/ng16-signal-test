export interface SomeListViewmodel {
  headline: string;
  entries: SomeListEntryViewmodel[] | undefined;
  isLoading: boolean;
}

export interface SomeListEntryViewmodel {
  name: string;
  counter: number;
  onClick: () => void;
}
