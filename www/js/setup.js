/*global $*/
/*jslint browser: true*/
//Configuration de jQuery Mobile
$(document).on(
    'mobileinit',
    function () {
        'use strict';
        $.extend(
            $.mobile,
            {
                defaultPageTransition: 'none'
            }
        );
    }
);
