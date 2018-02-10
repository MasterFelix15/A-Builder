AFRAME.registerComponent('pressable', {
    schema: {
        on: {type: 'string'},
        src: {type: 'string'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;
        var sceneEl = document.querySelector('a-scene');

        el.addEventListener(data.on, function (evt) {
            var xarrowEl = document.querySelector('#x-arrow');
            var yarrowEl = document.querySelector('#y-arrow');
            var zarrowEl = document.querySelector('#z-arrow');
            var axisEl = document.querySelector('#axis-system');
            var markerEl = document.querySelector('#marker');
            var markedEl = document.querySelector('#marked');
            var menuEl = document.querySelector('#menu');
            var avatarEl = document.querySelector('#avatar');
            var location = markerEl.getAttribute('position');
            var scale = markedEl.getAttribute('scale');
            var rotation = markedEl.getAttribute('rotation');
            var position = markedEl.getAttribute('position');
            var selectedAxis = "x";
            if (yarrowEl.getAttribute('material').color === "#FF4E50") {
                selectedAxis = "y";
            } else if (zarrowEl.getAttribute('material').color === "#FF4E50") {
                selectedAxis = "z";
            }
            console.log(xarrowEl.getAttribute('material').color);
            switch (data.src) {
                case "tp":
                    avatarEl.setAttribute('position', location.x + " 1 " + location.z);
                    markerEl.setAttribute('visible', false);
                    menuEl.setAttribute('visible', false);
                    break;
                case "del":
                    var copy = axisEl.cloneNode(true);
                    sceneEl.appendChild(copy);
                    axisEl.parentNode.removeChild(axisEl);
                    markedEl.parentNode.parentNode.removeChild(markedEl.parentNode);
                    markerEl.setAttribute('visible', false);
                    menuEl.setAttribute('visible', false);
                    break;
                case "axis-x":
                    selectedAxis = "x";
                    xarrowEl.setAttribute('material', "side: double; color: #FF4E50");
                    yarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    zarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    break;
                case "axis-y":
                    selectedAxis = "y";
                    yarrowEl.setAttribute('material', "side: double; color: #FF4E50");
                    xarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    zarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    break;
                case "axis-z":
                    selectedAxis = "z";
                    zarrowEl.setAttribute('material', "side: double; color: #FF4E50");
                    yarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    xarrowEl.setAttribute('material', "side: double; color: #2A363B");
                    break;
                case "size-":
                    if (selectedAxis === "x") {
                        console.log(markedEl.childNodes);
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x * 0.9, scale.y, scale.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x, scale.y * 0.9, scale.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x, scale.y, scale.z * 0.9));
                    }
                    break;
                case "size+":
                    if (selectedAxis === "x") {
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x / 0.9, scale.y, scale.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x, scale.y / 0.9, scale.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('scale', new THREE.Vector3(scale.x, scale.y, scale.z / 0.9));
                    }
                    break;
                case "rotation-":
                    if (selectedAxis === "x") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x - 15, rotation.y, rotation.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x, rotation.y - 15, rotation.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x, rotation.y, rotation.z - 15));
                    }
                    break;
                case "rotation+":
                    if (selectedAxis === "x") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x + 15, rotation.y, rotation.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x, rotation.y + 15, rotation.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('rotation', new THREE.Vector3(rotation.x, rotation.y, rotation.z + 15));
                    }
                    break;
                case "position-":
                    if (selectedAxis === "x") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x - 0.05, position.y, position.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x, position.y - 0.05, position.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x, position.y, position.z - 0.05));
                    }
                    break;
                case "position+":
                    if (selectedAxis === "x") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x + 0.05, position.y, position.z));
                    } else if (selectedAxis === "z") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x, position.y + 0.05, position.z));
                    } else if (selectedAxis === "y") {
                        markedEl.setAttribute('position', new THREE.Vector3(position.x, position.y, position.z + 0.05));
                    }
                    break;
            }

        });
    }
});