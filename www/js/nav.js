/*global $*/
/*jslint browser: true, unparam: true*/
var nav = (function () {
    'use strict';
    function setPage(e, dest) {
        var id = $(dest.toPage).attr('id');
        if (window[id] && window[id].onnav) {
            window[id].onnav();
        }
    }
    return {
        init: function () {
            $(':mobile-pagecontainer').on('pagecontainerchange', setPage);
        }
    };
}());

$(document).ready(nav.init);
