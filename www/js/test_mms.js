/*global $, localforage*/
/*jslint browser: true, unparam: true*/
var test_mms = (function () {
    'use strict';
    var score = 0,
        curQuestion = 0,
        curSubQuestion = 0,
        questions = [
            {
                title: "Orientation",
                description: "Dans cette partie, vous allez pouvoir explorer les capacités d'orientation dans le temps et dans l'espace.<br/><br/><b>Consignes</b> : Je vais vous poser quelques questions pour apprécier votre mémoire. Certaines sont simples, d'autres un peu moins, vous devez répondre du mieux que vous pouvez.<br/><br/><b>Conseil</b> : Si réponse est fausse, donner la bonne réponse au patient !",
                questions: [
                    {
                        title: 'Orientation temporelle',
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
                            }
                        ]
                    },
                    {
                        title: 'Orientation spatiale',
                        questions: [
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
            $('#test_mms_intro_title').text(questions[question].title);
            if (questions[question].description) {
                $('#test_mms_intro_text').html(questions[question].description);
            } else {
                $('#test_mms_question_text').empty();
            }
            $('#test_mms_question').hide();
            $('#test_mms_intro').show();
        } else {
            $('#test_mms_question_title').text(questions[question].questions[subQuestion - 1].title);
            if (questions[question].questions[subQuestion - 1].description) {
                $('#test_mms_question_text').html(questions[question].questions[subQuestion - 1].description);
            } else {
                $('#test_mms_question_text').empty();
            }
            $('#multiple_questions').empty();
            if (questions[question].questions[subQuestion - 1].questions) {
                $('#single_question').hide();
                $(questions[question].questions[subQuestion - 1].questions).each(function (i, subsubquestion) {
                    $('#multiple_questions').append('<label>' + subsubquestion.title + '<input class="text_mms_check" type="checkbox" /></label>');
                });
                $('#multiple_questions').show();
            } else {
                $('#single_question').show();
                $('#multiple_questions').hide();
            }
            $('#test_mms_question').show();
            $('#test_mms_intro').hide();
        }
    }
    function nextQuestion() {
        var nextSubQuestion = curSubQuestion + 1,
            $text_mms_check = $('.text_mms_check');
        score += $text_mms_check.filter(":checked").size();
        $text_mms_check.prop('checked', false);
        $text_mms_check.filter('[data-role=flipswitch]').flipswitch("refresh");
        if (questions[curQuestion].questions[nextSubQuestion - 1] || questions[curQuestion + 1]) {
            if (questions[curQuestion].questions[nextSubQuestion - 1]) {
                showQuestion(curQuestion, nextSubQuestion);
                $('#test_mms_progress').css('width', ((curNbQuestion / nbQuestions) * 100) + '%');
                $('#test_mms_curquestion').text(curNbQuestion);
                curNbQuestion += 1;
            } else {
                showQuestion(curQuestion + 1, 0);
            }
        } else {
            $('#test_mms_question, #test_mms_intro, #test_mms_footer').hide();
            $('#test_mms_results').show();
            var color, scoreDesc;
            if (score >= 10) {
                color = '#88C100';
                scoreDesc = "Bravo ! Rien d’alarmant pour le moment, cependant si vous avez le moindre doute, parlez-en à votre médecin traitant et réessayez dans quelques mois.";
            } else if (score >=3) {
                color = '#FF8A00';
                scoreDesc = "Oups ! Quelques petites questions posent problème, réessayez dans un mois, dans un environnement calme. Cependant si le moindre doute a motivé la réalisation de ce test, n’hésitez pas à en parler à votre médecin traitant.";
            } else {
                color = '#FF003C';
                scoreDesc = "Plusieurs questions semblent poser problème, il serait nécessaire d’en discuter rapidement avec votre médecin traitant.";
            }
 
            $('#test_mms_results_score').html('<div style="background-color:' + color + ';" class="app-score-circle"></div>' + '<p>' + scoreDesc + '</p><p>Rappel : ceci n’est pas un diagnostic mais bien un dépistage de troubles cognitifs. Un diagnostic ne peut être posé que par un médecin, en général après une imagerie cérébrale.</p>');
            localforage.setItem(Date.now().toString(), {
                test: 'mms',
                score: score
            });
        }
    }
    function startTest() {
        $('#test_mms_home').hide();
        $('#test_mms_question, #test_mms_footer').show();
        showQuestion(0, 0);
    }
    return {
        init: function () {
            $('#test_mms_start').click(startTest);
            $('#test_mms_next').click(nextQuestion);
            $('#test_mms_question, #test_mms_footer, #test_mms_results').hide();
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
            $('#test_mms_nbquestions').text(nbQuestions);
        }
    };
}());

$(document).ready(test_mms.init);
