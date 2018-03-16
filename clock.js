class Clock {
  constructor() {

    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.printTime();
    const boundTick = this._tick.bind(this);
    window.setInterval(boundTick,1000);
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    console.dir(boundTick);
  }

  printTime() {
    let time = `${this.hours}:${this.minutes}:${this.seconds}`;
    // console.dir(this);
    // console.log("Time");
    console.log(time);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  _tick() {
    this.seconds++;
    // debugger
    // console.dir(this);
    this.printTime();
    // 1. Increment the time by one second.
    // 2. Call printTime.
  }
}

const clock = new Clock();
// const boundFunct = clock.printTime.bind(window);
