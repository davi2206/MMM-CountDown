Module.register("MMM-CountDown", {

  defaults: {
    exampleContent: "dflt",
    countdownSeconds: 10,
    endDate: '01-01-2000'.split('-'),
    endTime: '00:00'.split(':'),
    end: new Date(),
    diff: 0,
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["CountDown.css"];
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    counters = this.config.counters;
    wrapper = document.createElement("div");
    this.updateTimeLeft();
    let interval = 500;
    let units = counters.map(c => c.countdownUnit);
    if(units.includes("days")) interval = 500*60*60*24;
    if(units.includes("hours")) interval = 500*60*60;
    if(units.includes("minutes")) interval = 500*60;
    if(units.includes("seconds")) interval = 500;
    
    // set timeout for next random text
    setInterval(() => {this.updateTimeLeft()}, interval);
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    return wrapper
  },

  updateTimeLeft() {
    let nf = new Intl.NumberFormat('da-DK');
    wrapper = document.createElement("div");
    counters.forEach(counter => {
      if(!counter.targetTime) counter.targetTime = '00:00';
      endDate = counter.targetDate.split('-');
      endTime = counter.targetTime.split(':');
      end = new Date(endDate[2], endDate[1]-1, endDate[0], endTime[0], endTime[1]);
      diff = (end - new Date())/1000;

      if(!counter.countdownUnit) counter.countdownUnit = 'minutes';

      switch(counter.countdownUnit) {
        case "seconds":
          break;
        case "minutes":
          diff = diff/60;
          break;
        case "hours":
          diff = diff/60/60;
          break;
        case "days":
          diff = diff/60/60/24;
          break;
        case "weeks":
          diff = diff/60/60/24/7;
          break;
        case "months":
            diff = diff/60/60/24/30;
            break;
        case "years":
          diff = diff/60/60/24/365;
          break;
        default:
          diff = diff/60;
          break;
      }
  
      diff = nf.format(Math.round(diff));
      wrapper.innerHTML += `<div class="cdTitle">${counter.title || ''}</div>${diff}`;
      if(counter.showUnit) wrapper.innerHTML += ` ${counter.countdownUnit}`
    });
    
    this.updateDom();
  }
})
