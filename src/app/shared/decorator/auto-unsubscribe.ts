import { forkJoin, Subject, Subscription, takeUntil } from 'rxjs';

export const AutoUnsubscribe = (blackList: string[] = []) => {
  return (constructor: any) => {
    const ngOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (let [key, value] of Object.entries(this)) {
        if (blackList.indexOf(key) < 0 && value instanceof Subscription) {
          value.unsubscribe()
        }
      }

      ngOnDestroy && typeof ngOnDestroy === "function" && ngOnDestroy.apply(this, arguments);
    }
  }
}
