# banglejs-2-smart-clock-size #

calculates position and size of an analog clock on a Bangle.js 2

This module calculates the size of an analog clock face for the [Bangle.js 2](https://www.espruino.com/Bangle.js2) depending on how much space is already occupied by any loaded widgets.

If those widgets are small and well placed in the corners of a Bangle's display, this module allows a clock face to become significantly larger than a [simple clock size calculation](https://github.com/rozek/banglejs-2-simple-clock-size).

## Usage ##

Within a clock implementation, the module may be used as follows:

```
let ClockSize = require('https://raw.githubusercontent.com/rozek/banglejs-2-smart-clock-size/main/ClockSize.js');

let CenterX = ClockSize.CenterX();
let CenterY = ClockSize.CenterY();

let outerRadius = ClockSize.outerRadius();
```

`CenterX`, `CenterY` and `outerRadius` are the values you will then pass to the routines which draw clock face and hands.

## License ##

[MIT License](LICENSE.md)
