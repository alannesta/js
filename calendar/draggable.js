var Draggable = (function($) {
    var inst = null;
    var dragging = false;       // indicate if there is dragging action in progress
    var posOffset;

    function addHandler(element) {
        // element.addEventListener('mousedown mousemove mouseup', handleDrag);
        $(element).on('mousedown mousemove mouseup', handleDrag);
    }

    function _position(element, mousePosition) {
        // var width = element.offsetWidth;
        // var height = element.offsetHeight;
        $element = $(element);
        var elOffsetLeft = $element.offset().left;
        var elOffsetTop = $element.offset().top;
        return {left: mousePosition.left - elOffsetLeft, top: mousePosition.top - elOffsetTop};
    }

    function handleDrag(e) {
        switch (e.type) {
            case 'mousedown':
                if (dragging || inst) {
                    return;
                } else if ($(e.target).hasClass('draggable')) {
                    inst = e.target;
                    var mousePosition = {left: e.clientX, top: e.clientY};
                    posOffset = _position(inst, mousePosition);
                }

                break;

            case 'mousemove':
                // if (e.target === inst) {
                //     dragging = true;
                //     if (getComputedStyle(inst).position === 'static') {
                //         inst.style.position = 'absolute';
                //     }
                //     var mousePosition  = {left: e.clientX, top: e.clientY};
                //     var pos = _position(inst, mousePosition);
                //     $(inst).css({'left': pos.left + 'px', 'top': pos.top + 'px'});
                // }
                if (inst !== null) {
                    dragging = true;
                    if (getComputedStyle(inst).position === 'static') {
                        inst.style.position = 'absolute';
                    }
                    $(inst).css({
                        'left': e.clientX - posOffset.left + 'px',
                        'top': e.clientY - posOffset.top + 'px'
                    });
                }

                break;
            case 'mouseup':
                inst = null;
                dragging = false;
                console.log('mouseup clean');
                break;
        }
    }

    return {
        addHandler: addHandler
    }
})(jQuery);