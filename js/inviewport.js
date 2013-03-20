/*
* jQuery inViewPort v1.0
* http://henrottesimon.com
*
* Copyright 2013, Simon Henrotte
*/

jQuery.fn.inViewPort = function (settings,callbackFnk){
    settings = jQuery.extend({
        offsetTop: 0,
        offsetLeft:0,
        offsetHeight: 0,
        offsetWidth: 0,
        viewport : $(window),
        spot: "top",
        inView: function() {},
        outView: function() {},
        callback: function() {}
    }, settings);

    	var viewport = settings.viewport,
        el = $(this);

        viewport.scroll(function(){
            var hVp = getViewportHeight(),
                scrolltop = (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop),
                scrollleft = (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft),
                top = el.offset().top + settings.offsetTop,
                height = (settings.spot == "bottom" || settings.spot == "bottomLeft" || settings.spot == "bottomRight") ? el.height() + settings.offsetHeight : 0 + settings.offsetHeight,
                left = el.offset().left + settings.offsetLeft,
                width = (settings.spot == "right" || settings.spot == "topRight" || settings.spot == "bottomRight") ? el.width() + settings.offsetWidth : 0 + settings.offsetWidth,
                inviewport = el.data('inviewport') || false;
            if(settings.spot == "top" || settings.spot == "bottom" || settings.spot == "left" || settings.spot == "right"){

                if(settings.spot == "top" || settings.spot == "bottom"){
                    if(scrolltop > (top + height) || scrolltop + hVp < top){
                        if (inviewport) {
                            el.data('inviewport', false);
                            el.trigger('inviewport', [ false ]);                        
                        }
                    }
                    else if(scrolltop < (top + height))
                    {
                        if (!inviewport) {
                            el.data('inviewport', true);
                            el.trigger('inviewport', [ true ]);
                        }
                    }
                }
                else if(settings.spot == "left" || settings.spot == "right"){
                    if(scrollleft > left + width || scrollleft + hVp < left)
                    {
                        if (inviewport) {
                            el.data('inviewport', false);
                            el.trigger('inviewport', [ false ]);                        
                        }
                    }
                    else if(scrollleft < (left + width))
                    {
                        if (!inviewport) {
                            el.data('inviewport', true);
                            el.trigger('inviewport', [ true ]);
                        }
                    }
                }
            }
            else if(settings.spot == "topLeft" || settings.spot == "bottomLeft" || settings.spot == "topRight" || settings.spot == "bottomRight"){
                if ((scrolltop > (top + height) || scrolltop + hVp < top ) && (scrollleft > left + width || scrollleft + hVp < left)) {
                    if (inviewport) {
                        el.data('inviewport', false);
                        el.trigger('inviewport', [ false ]);                        
                    }
                } else if ((scrolltop < (top + height)) || (scrollleft < (left + width))) {
                    if (!inviewport) {
                        el.data('inviewport', true);
                        el.trigger('inviewport', [ true ]);
                    }
                }
            }
        });
        
        el.bind('inviewport',function(event, visible){
            if(visible == true)
            {
                settings.inView.call(this);
            }
            else
            {
                settings.outView.call(this);
            }
        });
        
        viewport.scroll();
        settings.callback.call(this);
};


function getViewportHeight() {
    var height = window.innerHeight; // Safari, Chrome, Opera
    var mode = document.compatMode;

    if ( mode || !$.support.boxModel ) { // IE, Gecko
        height = (mode == 'CSS1Compat') ?
        document.documentElement.clientHeight : // Standards
        document.body.clientHeight; // Quirks
    }
    return height;
}