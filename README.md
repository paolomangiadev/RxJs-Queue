# Implementation of a queue in RxJs

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-c3wmmc)

**Description:**

This queue implementation comes pretty handy when dealing with http calls that depend one on another.
Something to notice is that even though the 3 actions registration (addToQueue) have different timeouts, the actions will be executed following the "First In First Out" (FIFO) principles, outputting:

```
Hello 1
Hello 2
Hello 3
```
**Visual representation:**

![alt_text](https://www.tutorialsteacher.com/Content/images/csharp/csharp-queue.png)

**Code:**

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
