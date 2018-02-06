AFRAME.registerComponent('teleportable', {
    init: function () {
        var data = this.data;
        var el = this.el;

        el.sceneEl.addEventListener("long-press-event", function (evt) {
            var markerEl = document.querySelector('#marker');
            var menuEl = document.querySelector('#menu');
            var position = markerEl.getAttribute('position');
            console.log(position);

            if (position.y < 0.01) {
                el.setAttribute('position', position.x + " 1 " + position.z);
            }

            markerEl.setAttribute('visible', false);
            menuEl.setAttribute('visible', false);
        });
    }
});