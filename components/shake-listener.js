AFRAME.registerComponent('shake-listener', {
    init: function () {
        var targetEl = this.el;
        var count = 0;
        // you could also initialize the shake instance here
        window.addEventListener('shake', function () {
            if (++count % 2) {
                targetEl.emit('shakestart');
                console.log("shakestart");
                var markerEl = document.querySelector('#marker');
                markerEl.setAttribute('visible', false);
            } else {
                targetEl.emit('shakeend');
                console.log("shakeend");
                markerEl = document.querySelector('#marker');
                markerEl.setAttribute('visible', true);
            }
        })
    }
});