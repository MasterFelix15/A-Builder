AFRAME.registerComponent('click-events', {
    init: function() {
        var data = this.data;
        var el = this.el;

        var longPressTimer = null;
        var extraLongPressTimer = null;

        var shortPress = false;
        var longPress = false;
        var extraLongPress = false;

        el.addEventListener('mousedown', function(e) {
            shortPress = false;
            longPress = false;
            extraLongPress = false;

            shortPress = true;

            longPressTimer = setTimeout(function () {
                longPress = true;
            }, 1000);

            extraLongPressTimer = setTimeout(function () {
                extraLongPress = true;
            }, 3000);
        });

        el.addEventListener('mouseup', function(e) {
            if (longPressTimer !== null) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }

            if (extraLongPressTimer !== null) {
                clearTimeout(extraLongPressTimer);
                extraLongPressTimer = null;
            }

            var tel = e.detail.intersectedEl;
            if (tel == null) {return;}

            if (extraLongPress) {
                el.emit('extra-long-press-event', e);
            } else if (longPress) {
                el.emit('long-press-event', e);
            } else if (shortPress) {
                el.emit('short-press-event', e);
            }
        });
    }
});