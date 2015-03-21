/*global $*/
/*jslint browser: true, unparam: true*/
var test_mms = (function () {
    'use strict';
    var score = 0,
        curQuestion = 0,
        curSubQuestion = 0,
        questions = [
            {
                title: "Orientation",
                description: "",
                questions: [
                    {
                        title: "En quelle année sommes-nous ?"
                    },
                    {
                        title: "En quelle saison ?"
                    },
                    {
                        title: "En quel mois ?"
                    },
                    {
                        title: "Quel jour du mois ?"
                    },
                    {
                        title: "Quel jour de la semaine ?"
                    },
                    {
                        title: "Quel est le nom de la rue où nous sommes ?"
                    },
                    {
                        title: "Dans quelle ville se trouve-t-elle ?"
                    },
                    {
                        title: "Quel est le nom du département dans lequel se situe cette ville ?"
                    },
                    {
                        title: "Dans quelle région est située ce département ?"
                    },
                    {
                        title: "À quel étage sommes-nous ici ?"
                    }
                ]
            },
            {
                title: "Apprentissage",
                description: ""
            }
        ],
        nbQuestions = 0,
        curNbQuestion = 1;
    function showQuestion(question, subQuestion) {
        curQuestion = question;
        curSubQuestion = subQuestion;
        console.log(question, subQuestion);
        if (subQuestion === 0) {
            $('#test_mms_intro_title').text(questions[question].title);
            $('#test_mms_question').hide();
            $('#test_mms_intro').show();
        } else {
            $('#test_mms_question_title').text(questions[question].questions[subQuestion - 1].title);
            $('#test_mms_question').show();
            $('#test_mms_intro').hide();
        }
        $('#test_mms_curquestion').text(curNbQuestion);
    }
    function nextQuestion() {
        var nextSubQuestion = curSubQuestion + 1;
        if (questions[curQuestion].questions[nextSubQuestion - 1]) {
            showQuestion(curQuestion, nextSubQuestion);
            curNbQuestion += 1;
        } else {
            showQuestion(curQuestion + 1, 0);
        }
    }
    function startTest() {
        $('#test_mms_start').hide();
        $('#test_mms_question, #test_mms_footer').show();
        showQuestion(0, 0);
    }
    return {
        init: function () {
            $('#test_mms_start').click(startTest);
            $('#test_mms_next').click(nextQuestion);
            $('#test_mms_question, #test_mms_footer').hide();
            $(questions).each(function (i, question) {
                $(question.questions).each(function (i, subQuestion) {
                    nbQuestions += 1;
                });
            });
            $('#test_mms_nbquestions').text(nbQuestions);
        }
    };
}());

$(document).ready(test_mms.init);
