(function () {
  let CenterX,CenterY, outerRadius

  function calculateClockSize () {
    let ScreenWidth  = g.getWidth();
    let ScreenHeight = g.getHeight();

    CenterX = ScreenWidth/2;
    CenterY = ScreenHeight/2;

    outerRadius = Math.min(CenterX,CenterY);

    if (global.WIDGETS == null) { return; }

  /**** calculate total space consumption of all loaded widgets ****/

    let WidgetLayouts = {
      tl:{ x:0,             y:0,               Direction:0 },
      tr:{ x:ScreenWidth-1, y:0,               Direction:1 },
      bl:{ x:0,             y:ScreenHeight-24, Direction:0 },
      br:{ x:ScreenWidth-1, y:ScreenHeight-24, Direction:1 }
    };

    for (let Widget of WIDGETS) {
      let WidgetLayout = WidgetLayouts[Widget.area];     // reference, not copy!
      if (WidgetLayout == null) { continue; }

      Widget.x = WidgetLayout.x - WidgetLayout.Direction * Widget.width;
      Widget.y = WidgetLayout.y;

      WidgetLayout.x += Widget.width * (1-2*WidgetLayout.Direction);
    }

  /**** now find the largest circle that fits in between ****/

    let x,y, dx,dy;
    let cx = CenterX, cy = CenterY, r = Math.min(cx,cy), oldR;

    if (WidgetLayouts.tl.x > 0) {
      x = WidgetLayouts.tl.x; y = WidgetLayouts.tl.y+24; dx = x - cx; dy = y - cy;
      oldR = r;
        r = Math.min(r,((cx-x)*(cx-x)+(ScreenHeight-y)*(ScreenHeight-y)) / (2*(ScreenHeight-y)));
      cy += oldR-r;
    }

    if (WidgetLayouts.tr.x < ScreenWidth-1) {
      x = WidgetLayouts.tr.x; y = WidgetLayouts.tr.y+24; dx = x - cx; dy = y - cy;
      oldR = r;
        r = Math.min(r,((cx-x)*(cx-x)+(ScreenHeight-y)*(ScreenHeight-y)) / (2*(ScreenHeight-y)));
      cy += oldR-r;
    }

    if (WidgetLayouts.bl.x > 0) {
      x = WidgetLayouts.bl.x; y = WidgetLayouts.bl.y; dx = x - cx; dy = y - cy;
      oldR = r;
        r = Math.min(r,((cx-x)*(cx-x)+y*y) / (2*y));
      cy -= oldR-r;
    }

    if (WidgetLayouts.br.x < ScreenWidth-1) {
      x = WidgetLayouts.br.x; y = WidgetLayouts.br.y; dx = x - cx; dy = y - cy;
      oldR = r;
        r = Math.min(r,((cx-x)*(cx-x)+y*y) / (2*y));
      cy -= oldR-r;
    }

    CenterX = cx; CenterY = cy; outerRadius = r;
  }

  exports.CenterX = function getCenterX () {
    if (CenterX == null) { calculateClockSize(); }
    return CenterX;
  };

  exports.CenterY = function getCenterY () {
    if (CenterX == null) { calculateClockSize(); }
    return CenterY;
  };

  exports.outerRadius = function getOuterRadius () {
    if (CenterX == null) { calculateClockSize(); }
    return outerRadius;
  };
})();

