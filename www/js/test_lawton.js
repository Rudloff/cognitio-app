/*global $, localforage*/
/*jslint browser: true, unparam: true*/
var test_lawton = (function () {
    'use strict';
    var score = 0,
        curQuestion = 0,
        curSubQuestion = 0,
        questions = [
            {
                title: "Test de Lawton",
                description: "",
                questions: [
                    {
                        title: 'Capacité à utiliser le téléphone',
                        questions: [
                            {
                                title: "Se sert du téléphone de sa propre initiative, cherche et compose les numéros"
                            },
                            {
                                title: "Compose un petit nombre de numéros de téléphone bien connus"
                            },
                            {
                                title: "Répond au téléphone, mais n'appelle pas"
                            },
                            {
                                title: "Est incapable d'utiliser le téléphone"
                            }
                        ]
                    },
                    {
                        title: 'Capacité à utiliser les moyens de transport',
                        questions: [
                            {
                                title: "Peut voyager seul(e) en utilisant les transports publics, le taxi ou bien son propre véhicule"
                            },
                            {
                                title: "Peut prendre les transports en commun en étant accompagné(e)"
                            },
                            {
                                title: "Limite son transport au taxi ou à la voiture, en étant accompagné(e)"
                            },
                            {
                                title: "Ne se déplace pas du tout à l'extérieur"
                            }
                        ]
                    },
                    {
                        title: 'Responsabilité pour la prise des médicaments',
                        questions: [
                            {
                                title: "S'occupe de la prise (dosage et horaires)"
                            },
                            {
                                title: "Est capable de les prendre seul(e) mais a des oublis occasionnels"
                            },
                            {
                                title: "Peut les prendre si préparés et dosés préalablement"
                            },
                            {
                                title: "4. Est incapable de les prendre seul(e)"
                            }
                        ]
                    },
                    {
                        title: 'Capacités à gérer le budget',
                        questions: [
                            {
                                title: "Est totalement autonome (budget, faire des chèques, payer des factures)"
                            },
                            {
                                title: "Autonome mais oublie parfois de payer son loyer ou une facture"
                            },
                            {
                                title: "Gère les dépenses au jour le jour, mais besoin d'aide pour gérer le budget à long terme (planifier les dépenses importantes)"
                            },
                            {
                                title: "Est incapable de gérer l'argent nécessaire pour les dépenses au jour le jour"
                            }
                        ]
                    }
                ]
            }
        ],
        nbQuestions = 0,
        curNbQuestion = 1,
        totalScore = 0;
    function showQuestion(question, subQuestion) {
        curQuestion = question;
        curSubQuestion = subQuestion;
        if (subQuestion === 0) {
            $('#test_lawton_intro_title').text(questions[question].title);
            if (questions[question].description) {
                $('#test_lawton_intro_text').html(questions[question].description);
            } else {
                $('#test_lawton_question_text').empty();
            }
            $('#test_lawton_question').hide();
            $('#test_lawton_intro').show();
        } else {
            $('#test_lawton_question_title').text(questions[question].questions[subQuestion - 1].title);
            if (questions[question].questions[subQuestion - 1].description) {
                $('#test_lawton_question_text').html(questions[question].questions[subQuestion - 1].description);
            } else {
                $('#test_lawton_question_text').empty();
            }
            $('#test_lawton_multiple_questions').empty();
            if (questions[question].questions[subQuestion - 1].questions) {
                $('#test_lawton_single_question').hide();
                $(questions[question].questions[subQuestion - 1].questions).each(function (i, subsubquestion) {
                    $('#test_lawton_multiple_questions').append('<label>' + subsubquestion.title + '<input class="text_lawton_check" type="checkbox" /></label>');
                });
                $('#test_lawton_multiple_questions').show();
            } else {
                $('#test_lawton_single_question').show();
                $('#test_lawton_multiple_questions').hide();
            }
            $('#test_lawton_question').show();
            $('#test_lawton_intro').hide();
        }
    }
    function nextQuestion() {
        var nextSubQuestion = curSubQuestion + 1,
            $text_lawton_check = $('.text_lawton_check');
        score += $text_lawton_check.filter(":checked").size();
        $text_lawton_check.prop('checked', false);
        $text_lawton_check.filter('[data-role=flipswitch]').flipswitch("refresh");
        if (questions[curQuestion].questions[nextSubQuestion - 1] || questions[curQuestion + 1]) {
            if (questions[curQuestion].questions[nextSubQuestion - 1]) {
                showQuestion(curQuestion, nextSubQuestion);
                $('#test_lawton_progress').css('width', ((curNbQuestion / nbQuestions) * 100) + '%');
                $('#test_lawton_curquestion').text(curNbQuestion);
                curNbQuestion += 1;
            } else {
                showQuestion(curQuestion + 1, 0);
            }
        } else {
            $('#test_lawton_question, #test_lawton_intro, #test_lawton_footer').hide();
            $('#test_lawton_results').show();
            $('#test_lawton_results_score').text(score + ' / ' + totalScore);
            localforage.setItem(Date.now().toString(), {
                test: 'mms',
                score: score
            });
        }
    }
    function startTest() {
        $('#test_lawton_home').hide();
        $('#test_lawton_question, #test_lawton_footer').show();
        showQuestion(0, 0);
    }
    return {
        init: function () {
            $('#test_lawton_start').click(startTest);
            $('#test_lawton_next').click(nextQuestion);
            $('#test_lawton_question, #test_lawton_footer, #test_lawton_results').hide();
            $(questions).each(function (i, question) {
                $(question.questions).each(function (i, subQuestion) {
                    nbQuestions += 1;
                    if (subQuestion.questions) {
                        $(subQuestion.questions).each(function (i, subsubQuestion) {
                            totalScore += 1;
                        });
                    } else {
                        totalScore += 1;
                    }
                });
            });
            $('#test_lawton_nbquestions').text(nbQuestions);
        }
    };
}());

$(document).ready(test_lawton.init);
