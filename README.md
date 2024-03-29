# SignalTest

This repository is used to test [signals](https://angular.io/guide/signals), a feature that came with Angular 16

In particlular how easy it is to modify the state and how the change detection works. So always take a look at the DOM changes.

## How to use / structure
Navigate to `/src/app/some-list`. There you will find a basic rendering component and all the used services.

### View component
The component uses a service to get a viewmodel, which then is used to render elements in the view.
With different buttons, you can start different scenarios, like

1. Getting valid data once (Promise based loading)
2. Getting valid data multiple times (Observable based loading)
3. (TODO) Getting invalid data once (Promise based loading)
4. (TODO) Getting mixed valid and invalid data (Observable based loading)

Check the console logs to see the results of vm property changes.

Currently, there are two different inner components to render an entry.
One that takes the whole entry model as one binding, and another one that has one binding for each property.
Play around with vm changes to see how it directly affects the inner change detection.

### Mapping service
The mapping service `SomeListService` is mapping data he is getting from the mock data service to the viewmodel `SomeListViewmodel`.
It also provides an internal used method to modify the current viewmodel state. In this case inceasing a counter property, that each list entry has.

### Mock data service
The mock data service `SomeListMockDataService` is providing fake data. It uses timeouts and intervals to emulate a real backend service.
