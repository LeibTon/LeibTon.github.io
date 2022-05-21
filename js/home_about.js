/*About section in Homepage*/
dragElement(document.getElementById("moon_drag"));

/*Controlling the moonlight which can be dragged. */
function dragElement(elmnt) {
    var svg = document.querySelector(".image_background")
    var offset_x, translation;
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return (evt.clientX - CTM.e) / CTM.a
    }


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        offset_x = getMousePosition(e);
        translation = elmnt.getAttributeNS(null, "transform").slice(7, -1).split(',');
        offset_x -= parseInt(translation[4]);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        var coord_x = getMousePosition(e);
        elmnt.setAttributeNS(null, "transform", "matrix(" + translation[0] + "," + translation[1] + "," + translation[2] + "," + translation[3] + "," + (coord_x - offset_x) + "," + translation[5] + ")");
        if (coord_x - offset_x > 160 && coord_x - offset_x < 295) {
            document.getElementById("about_me_instruction").innerHTML = "Opening About Me..."
            open("/about.html", "_self")
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

    }
}