@extends('layouts.home' , ['sectionName' => 'حل جدول'])

@section('title' , 'حل جدول')

@section('head')
    <style>
        .puzzle {
            margin: 0 auto;
            text-align: center;
        }

        .puzzle td {
            width: 40px;
            height: 40px;
            border: 1px solid white;
        }

        #winModel {
            z-index: 999999;
        }

    </style>
@endsection

@section('scripts')
<script type="module">
    let rows = @json($table->rows);
    let puzzles = [];
    let puzzle_answered = [];
    let keyword_res = '';
    let counter = 0;


    rows.forEach(function(row){
        puzzles.push([row.id , row.answer , row.question , row.keyword1, row.keyword2, row.keyword3])
    })

    let exampleModal = document.getElementById('exampleModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
        let question_link = event.relatedTarget
        let question_text =  question_link.text.trim()

        let id = question_link.getAttribute('data-bs-whatever')
        let modalBodyInput = exampleModal.querySelector('.modal-body #question-text')
        let puzzle_id = exampleModal.querySelector('.modal-footer #puzzle_id')

        modalBodyInput.value = question_text
        puzzle_id.value = id
    });

    $('#close_question').on('click', function() {
        $('#exampleModal').find('form').get(0).reset()
    })
    $('#apply_answer').on('click', function(){
        let modal = $('#exampleModal');
        let id = $(this).siblings('#puzzle_id').val();
        let answer = modal.find('#answer-text').val().replace(/\s/g,'')
        let error = modal.find('#wrong-answer')
        let tableRow = $('#table_row_'+id)

        let puzzle = puzzles.filter(function (puz){
            return puz[0] == id;
        });
        puzzle = puzzle[0]

        if(puzzle[1] === answer)
        {
            puzzle_answered.push(puzzle)
            let characters = answer.split('')
            let columns = tableRow.children()
            let counter = 0;

            $('#question_'+id).remove()

            columns.each(function( index ) {
                $(this).text(characters[counter])
                if(puzzle[3] !== 0 || puzzle[4] !== 0 || puzzle[5] !== 0)
                {
                    if(index + 1 ===  puzzle[3] || index + 1 ===  puzzle[4] || index + 1 ===  puzzle[5])
                    {
                        $(this).css('background-color', 'green');
                    }
                }
                counter++;
            });


            if(puzzle_answered.length === puzzles.length)
            {
                $('#backModal').css('display', 'block')
                $('#winModel').css('display', 'block')
                let counter2 = 0;
                let keyword_res = '';

                puzzles.forEach(function (puzzle){
                    if(puzzle[3] !== 0)
                    {
                        let characters = puzzle[1].split('')
                        keyword_res += characters[puzzle[3] - 1]
                    }
                    if(puzzle[4] !== 0)
                    {
                        let characters = puzzle[1].split('')
                        keyword_res += characters[puzzle[4] - 1]

                    }
                    if(puzzle[5] !== 0)
                    {
                        let characters = puzzle[1].split('')
                        keyword_res += characters[puzzle[5] - 1]
                    }
                })

                $('#result_key').text(keyword_res)
            }

            modal.find('form').get(0).reset();
            modal.css('display' , 'none');
            $('.modal-backdrop').remove();
        }
        else
        {
            error.text('جواب اشتباه می باشد.');
            setTimeout(function (){
                error.text('');
            } , 3000)
        }
    })
</script>
@endsection

@section('content')
    <div class="row">
        <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">حل جدول</h3>
                    <div class="table-responsive">
                        <table class="puzzle" id="table-word">
                            @foreach($table->rows as $row)
                                @php
                                    $result = preg_split('/(?<!^)(?!$)/u', $row->answer );
                                @endphp
                                <tr id="table_row_{{$row->id}}">
                                    @for($i=0 ; $i < count($result) ; $i++)
                                        <td class="text-white"></td>
                                    @endfor
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">سوالات</h3>
                    <ul>
                        @foreach($table->rows as $row)
                            <li class="pb-4"  id="question_{{$row->id}}">
                                <a class="text-decoration-none text-white" data-bs-toggle="modal" href="#exampleModal" role="button" data-bs-whatever="{{$row->id}}">
                                    {{$row->question}}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">سوال:</label>
                            <textarea class="form-control text-dark" id="question-text" disabled></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="answer-text" class="col-form-label">جواب:</label>
                            <input type="text" class="form-control" id="answer-text">
                        </div>
                        <div class="mb-3">
                            <span class="text-danger" id="wrong-answer"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="puzzle_id" name="puzzle_id" value="">
                    <button type="button" id="close_question" class="btn btn-secondary" data-bs-dismiss="modal">بستن</button>
                    <button type="button" id="apply_answer" class="btn btn-primary">تایید پاسخ</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="winModel" tabindex="-1" aria-labelledby="winModelLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="{{route('solvers.store')}}" method="post">
                    @csrf
                    <h3 class="mt-4 text-center text-success">
                        جدول با موفقیت حل شد.
                    </h3>
                    <div class="mt-4 text-center">
                        <span>کلید اصلی :</span>
                        <span class="text-success" id="result_key"></span>
                    </div>
                    <div class="modal-body">
                            <div class="mb-3">
                                <label for="name" class="col-form-label">نام:</label>
                                <input name="name" type="text" class="form-control" id="name" required>
                            </div>

                            <div class="mb-3">
                                <label for="number" class="col-form-label">تلفن همراه:</label>
                                <input name="number" type="text" class="form-control" id="number" required>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="table_id" value="{{$table->id}}">
                        <button type="submit" class="btn btn-success">تایید</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection
