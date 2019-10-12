import { mergeMap, delay } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

class CallsGetQueue {
  private queue = new Subject();
  public results;
  constructor() {
    this.results = this.queue.pipe(
      mergeMap((action: any) => action(), 1));
  }

  addToQueue(action) {
    this.queue.next(action);
  }
}

const hello = (str, timeout) => 
  () => of(str).pipe(delay(timeout));
const instance = new CallsGetQueue();
instance.results.subscribe(res => console.log(res))
instance.addToQueue(hello('Hello 1', 3000))
instance.addToQueue(hello('Hello 2', 1000))
instance.addToQueue(hello('Hello 3', 2000))