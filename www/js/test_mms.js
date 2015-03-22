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
            },
            {
                title: "Apprentissage",
                description: "Cette partie concerne la mémoire courte, c'est le stockage bref des informations.<br/><br/><b>Consignes</b> : Je vais vous donner une liste de 3 mots, j'aimerais que vous les répetiez et essayiez de les retenir car je vous les redemanderais tout à l'heure",
                questions: [
                    {
                        title: "Mots à retenir",
                        description: "Si le sujet ne répète pas les trois mots au premier essai, les redonner jusqu'à ce qu'ils soient répétés correctement dans la limite de six essais. En effet, l'épreuve de rappel ne peut être analysée que si les trois mots ont été enregistrés.",
                        questions: [
                            {
                                title: "clef"
                            },
                            {
                                title: "citron"
                            },
                            {
                                title: "ballon"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Attention et calcul",
                description: "Cette partie apprécie la fonction qui permet la sélection et le maintien d'une information",
                questions: [
                    {
                        title: "Soustractions",
                        description: "Maintenant, je vais vous demander de compter à partir de 100 en retirant 7 à chaque fois jusqu'à ce que je vous arrête.<br/>(Il est permis d'aider le patient en lui présentant la première soustraction. « 100 – 7, combien cela fait-il ?  Et ensuite : Continuez... »)<br/><br/>Pour tous les sujets, même pour ceux qui ont obtenu le maximum de points, demander également : « Pouvez-vous épeler le mot MONDE à l'envers en commençant par la dernière lettre ? » (non noté)",
                        questions: [
                            {
                                title: "93"
                            },
                            {
                                title: "86"
                            },
                            {
                                title: "79"
                            },
                            {
                                title: "72"
                            },
                            {
                                title: "65"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Rappel",
                description: "",
                questions: [
                    {
                        title: "Mots à retenir - rappel",
                        description: "Quels étaient les trois mots que je vous ai demandé de retenir tout à l'heure ?",
                        questions: [
                            {
                                title: "clef"
                            },
                            {
                                title: "citron"
                            },
                            {
                                title: "ballon"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Langage",
                description: "",
                questions: [
                    {
                        title: "Crayon",
                        description: "Montrer un crayon.  Quel est le nom de cet objet ?<br/><br/>(Aucune autre réponse que « crayon » n'est admise. Le sujet ne doit pas prendre les objets en main.)"
                    },
                    {
                        title: "Montre",
                        description: "Montrer une montre.  Quel est le nom de cet objet ? "
                    },
                    {
                        title: "Écoutez bien et répétez après moi : « PAS DE MAIS, DE SI, NI DE ET » ",
                        description: "La phrase doit être prononcée lentement à haute voix, face au malade. Si le patient dit ne pas avoir entendu, ne pas répéter la phrase. Si l'examinateur a un doute, il peut être admis de vérifier en répétant la phrase à la fin du test."
                    },
                    {
                        title: "Feuille",
                        description: "La phrase doit être prononcée lentement à haute voix, face au malade. Si le patient dit ne pas avoir entendu, ne pas répéter la phrase. Si l'examinateur a un doute, il peut être admis de vérifier en répétant la phrase à la fin du test.<br/>Poser une feuille de papier blanc sur le bureau et la montrer au sujet en lui disant : « Écoutez bien et faites ce que je vais vous dire »<br/><br/>Si le sujet arrête et demande ce qu'il doit faire, ne pas répéter la consigne, mais dire « Faites ce que je vous ai dit de faire ».",
                        questions: [
                            {
                                title: "« Prenez mon papier dans la main droite. »"
                            },
                            {
                                title: "« Pliez-le en deux. »"
                            },
                            {
                                title: "« Jetez-le par terre. »"
                            }
                        ]
                    },
                    {
                        title: "Fermez les yeux",
                        description: "Montrer la feuille de papier sur laquelle est écrit en gros caractères « FERMEZ LES YEUX » et dire :  « Faites ce qui est marqué.<br/>Le point n'est accordé que si le sujet ferme les yeux. Il n'est pas accordé s'il se contente de lire la phrase."
                    },
                    {
                        title: "Phrase entière",
                        description: "Montrer une feuille de papier et un stylo, en disant :  « Voulez-vous m'écrire une phrase, ce que vous voulez, mais une phrase entière. »<br/>La phrase contient au minimum un sujet et un verbe, ne pas tenir compte des erreurs d'orthographe ou de syntaxe."
                    }
                ]
            },
            {
                title: "Construction",
                description: "",
                questions: [
                    {
                        title: "Figure",
                        description: "Montrer la figure et lui demander :  « Voulez-vous recopier ce dessin. »<br/><br/>Compter un point si tous les angles sont présents et si les figures se coupent sur les deux côtés différents. On peut autoriser plusieurs essais et accorder un temps d'une minute."
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
            $('#test_mms_results_score').text(score + ' / ' + totalScore);
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
