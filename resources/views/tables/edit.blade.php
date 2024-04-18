@extends('layouts.home' , ['sectionName' => 'ویرایش جدول'])

@section('title' , 'ویرایش جدول')

@section('head')
    <style>
        .btn-minus{
            float: right;
            color: red;
            height:25px;
            width:25px;
            cursor:pointer;
        }
        .messageBox {
            position: fixed;
            padding: 20px;
            top: 15%;
            left: 50%;
            z-index: 9999;
            background: rgba(0,0,0,1);
            transform: translate(-50%, -50%);
        }

    </style>
@endsection


@section('scripts')
    <script type="module">
        $("#czContainer").czMore();

        $('[id^=row-]').children("#btn-minus").click(function () {
            $(this).parent('[id^=row-]').remove();
        });

        $('.btn-close').on('click' , function (){
            $('#message').remove()
        })
        setTimeout(function() {
            $('#message').remove();
        }, 10000);

    </script>
@endsection

@section('content')
    @if ($errors->any())
        <div class="bg-danger w-75 mx-auto d-flex justify-content-between messageBox" id="message">
            <ul class="text-white ">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <div>
                <button type="button" class="btn-close btn btn-outline-light"> X </button>
            </div>
        </div>
    @endif


    <div class="card row">
        <div class="card-body px-5 py-4">
            <div class="d-flex justify-content-between">
                <div><h3 class="card-title mb-3">ایجاد جدول</h3></div>
                <div><a href="{{route('tables.index')}}" class="btn btn-primary p-2">نمایش جدولها</a></div>
            </div>
            <hr class="mb-5">

            <form action="{{route('tables.update' , ['table' => $table->id])}}" method="post" id="file_form">
                @csrf
                @method('PUT')
                <div class="row">
                    <div class="form-group">
                        <label for="name"> نام جدول:</label>
                        <input type="text" name="name" class="form-control" id="name" value="{{$table->name}}" placeholder="نام">
                    </div>
                </div>
                <div class="row">
                    <h3 class="mt-4">ایجاد معماها:</h3>
                    @foreach($table->rows as $row)
                        <div id="row-{{$row->id}}">
                            <div id="btn-minus" class="btn-minus"><i class="mdi mdi-minus"></i></div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="question">پرسش:</label>
                                    <textarea name="rows[question][]" class="form-control" placeholder="پرسش" rows="3">{{$row->question}}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="answer"> جواب:</label>
                                    <input type="text" name="rows[answer][]" class="form-control" value="{{$row->answer}}" placeholder="جواب">
                                </div>
                                <div class="form-group">
                                    <label> کلید اصلی 1(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                    <input type="text" name="rows[keyword1][]" class="form-control" value="{{$row->keyword1}}" placeholder="مقدار">
                                </div>
                                <div class="form-group">
                                    <label> کلید اصلی 2(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                    <input type="text" name="rows[keyword2][]" class="form-control" value="{{$row->keyword2}}" placeholder="مقدار">
                                </div>
                                <div class="form-group">
                                    <label> کلید اصلی 3(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                    <input type="text" name="rows[keyword3][]" class="form-control" value="{{$row->keyword3}}" placeholder="مقدار">
                                </div>
                            </div>
                        </div>
                    @endforeach
                    <div id="czContainer">
                        <div id="first">
                            <div class="recordset">
                                <div class="row">
                                    <div class="form-group">
                                        <label for="question">پرسش:</label>
                                        <textarea name="rows[question][]" class="form-control" placeholder="پرسش" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="answer"> جواب:</label>
                                        <input type="text" name="rows[answer][]" class="form-control" placeholder="جواب">
                                    </div>
                                    <div class="form-group">
                                        <label> کلید اصلی 1(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                        <input type="text" name="rows[keyword1][]" class="form-control" placeholder="مقدار">
                                    </div>
                                    <div class="form-group">
                                        <label> کلید اصلی 2(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                        <input type="text" name="rows[keyword2][]" class="form-control" placeholder="مقدار">
                                    </div>
                                    <div class="form-group">
                                        <label> کلید اصلی 3(شماره حرف مورد نظر را بنویسید , عدد صفر یعنی هیچ کدام از حروف جزو کلید اصلی نیست.):</label>
                                        <input type="text" name="rows[keyword3][]" class="form-control" placeholder="مقدار">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center pt-3">
                    <input type="hidden" name="type_file" value="business">
                    <button type="submit" class="btn btn-primary w-100 enter-btn">ویرایش</button>
                </div>
            </form>
        </div>
    </div>
@endsection
