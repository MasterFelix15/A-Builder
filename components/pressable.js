AFRAME.registerComponent('pressable', {
    schema: {
        on: {type: 'string'},
        src: {type: 'string'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener(data.on, function (evt) {
            switch (data.src) {
                case "tp":
                    var markerEl = document.querySelector('#marker');
                    var menuEl = document.querySelector('#menu');
                    var avatarEl = document.querySelector('#avatar');
                    var position = markerEl.getAttribute('position');
                    avatarEl.setAttribute('position', position.x + " 1 " + position.z);
                    markerEl.setAttribute('visible', false);
                    menuEl.setAttribute('visible', false);
                    break;
                case "op":
                    break;
            }

        });
    }
});