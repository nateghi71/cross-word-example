
<html>

<head>
    <title>100% JQuery, Open-Source Crossword Puzzle Generator and Game</title>
    <meta http-equiv="content-type" content="text/css/javascript/php; charset=UTF-8">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="{{asset('auth/js/crossword-puzzle.js')}}"></script>

    <link type="text/css" rel="stylesheet" href="{{asset('auth/css/crossword-puzzle.css')}}">

</head>

<script type="text/javascript">

    $(document).ready(function(event) {
        var puzzlewords = [
            // word, clue
            ['Incomplete', 'Some of us are always meant to be this.'],
            ['Ecosystem', 'Any system where life can grow and thrive.'],
            ['Rad', 'If it\'s totally far out, then it\'s also probably totally this.'],
            ['Love', 'Basis for all of human civilization.'],
            ['Peace', 'When no soul is trying to destroy another soul.'],
            ['Community', 'Where we come from and we we finally end.'],
            ['Justice', 'If anyone is missing this, then nobody really has it.'],
            ['Land', 'There is nothing sadder than a peasant without this.'],
            ['Equality', 'If we are to trust each other in society, we must have this between everyone.'],
            ['Fraternity', 'In Utopia, we are so friendly, it is like we are in one of these.'],
            ['Comrade', 'You call your friends this, because Mr. and Mrs. are Sexist, gender-dominating terms.'],
            ['Cooperative', 'If something is based on the opposite of Domination, it is called this.'],
            ['Voluntary', 'Not just free to arrive when you want, but free to leave when you want, too.'],
            ['Non-coercive', 'To do something in a way that requires no force at all.'],
            ['Horizontal', 'If top-down societies are vertical, then bottom-up societies are this.'],
            ['Wholesome', 'Your health, your family, and your community should be this.'],
        ];
        crosswordPuzzle(puzzlewords);
    });

</script>

<body>

<div id="root" class="root">
</div>

<div id="lists" class="lists">

    <table>

        <tr>
            <td width="50%" id="left-list" valign="top" class="list-text">
                <center>
                    <h3>Across</h3>
                </center>
            </td>
            <td width="50%" id="right-list" valign="top" class="list-text">
                <center>
                    <h3>Down</h3>
                </center>
            </td>
        </tr>

    </table>

</div>

<div id="answer-form">

    <div class="short-margin">

        <p id="position-and-clue"></p>

        <p>Answer : <input id="solution-answer" type="text" size="40"></p>

        <p id="answer-results" class="hidden"></p>

        <p><input type="button" id="cancel-button" value="Cancel"> <input type="button" id="answer-button" value="Answer"> <input type="button" id="reveal-answer-button" value="Reveal Answer"></p>

    </div>

</div>

</body>

</html>
