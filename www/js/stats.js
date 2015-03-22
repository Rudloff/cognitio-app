/*global $, localforage, Chart*/
/*jslint browser: true*/
var stats = (function () {
    'use strict';
    return {
        onnav: function () {
            var scores = [], labels = [];
            localforage.iterate(function (result, time) {
                scores.push(result.score);
                var date = new Date(parseInt(time, 10));
                labels.push(date.toDateString() + ' ' + date.toLocaleTimeString());
            }, function () {
                new Chart(document.getElementById("chart_mms_canvas").getContext("2d")).Line({
                    labels: labels,
                    datasets: [
                        {
                            label: "Résultats MMSE",
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

