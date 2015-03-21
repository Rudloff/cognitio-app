/*global $*/
/*jslint browser: true*/
var nav = (function () {
    'use strict';
    return {
        init: function () {
            //Initialisation du menu
            $('#menu').panel();
            $('#menu ul').listview();
        }
    };
}());

$(document).ready(nav.init);
