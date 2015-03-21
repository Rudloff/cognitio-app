/*global $, localforage, Chart*/
/*jslint browser: true*/
var stats = (function () {
    'use strict';
    var scores = [], labels = [];
    return {
        init: function () {
            localforage.iterate(function (result, time) {
                scores.push(result.score);
                var date = new Date(parseInt(time));
                labels.push(date.toDateString() + ' ' + date.toLocaleTimeString());
            }, function () {
                var chart_mms = new Chart(document.getElementById("chart_mms").getContext("2d")).Line({
                    labels: labels,
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: scores
                        }
                    ]
                });
            });
        }
    };
}());

$(document).ready(stats.init);
