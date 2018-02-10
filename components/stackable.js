AFRAME.registerComponent('stackable', {
    dependencies: ['raycaster'],
    schema: {
        on: {type: 'string'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener(data.on, function (evt) {
            var intersection = evt.detail.intersection;
            if (!intersection) { return; }
            var mat = intersection.object.matrixWorld;
            // remove parallel movement from the matrix
            mat.setPosition(new THREE.Vector3(0, 0, 0));

            // change local normal into global normal
            var global_normal = intersection.face.normal.clone().applyMatrix4(mat).normalize();

            // look at target coordinate = intersection coordinate + global normal vector
            var lookAtTarget = new THREE.Vector3().addVectors(intersection.point, global_normal);

            var point = intersection.point;
            var markerEl = document.querySelector('#marker');
            markerEl.setAttribute('position', point);
            markerEl.setAttribute('visible', true);
            markerEl.object3D.lookAt(lookAtTarget);
            var menuEl = document.querySelector('#menu');
            menuEl.setAttribute('position', new THREE.Vector3(point.x, point.y+1, point.z));
            menuEl.setAttribute('visible', true);

            if (el.getAttribute('id') == null ) {
                var markedEl = document.querySelector('#marked');
                if (markedEl != null) {
                    markedEl.setAttribute('material', "shader: standard; color: #999999");
                    markedEl.removeAttribute('id');
                }
                el.setAttribute('material', "shader: standard; color: #355C7D");
                el.setAttribute('id', "marked");
            }


            var axisEl = document.querySelector('#axis-system');
            var copy = axisEl.cloneNode(true);
            el.parentNode.appendChild(copy);
            axisEl.parentNode.removeChild(axisEl);

            axisEl = document.querySelector('#axis-system');
            axisEl.setAttribute('visible', el.getAttribute('id')!=="plane");
        });
    }
});