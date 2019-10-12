# Implementation of a queue in RxJs

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-c3wmmc)

Code:

```javascript
import { mergeMap, delay } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

class CallsGetQueue {
  private queue = new Subject();
  public results;
  constructor() {
    this.results = this.queue.pipe(
      mergeMap((action: any) => action(), 1));
  }

  // Add action to queue
  addToQueue(action) {
    this.queue.next(action);
  }
}

// Async action
const hello = (str, timeout) => 
  () => of(str).pipe(delay(timeout));

const instance = new CallsGetQueue();
instance.results.subscribe(res => console.log(res))

// Queue async actions
instance.addToQueue(hello('Hello 1', 3000))
instance.addToQueue(hello('Hello 2', 1000))
instance.addToQueue(hello('Hello 3', 2000))
```