@extends('layouts.home' , ['sectionName' => 'جدول ها'])

@section('title' , 'جدول ها')

@section('head')
    <style>

    </style>
@endsection


@section('scripts')
    <script type="module">

    </script>
@endsection

@section('content')
    <div class="row">
        @if($tables->isNotEmpty())
            <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">جدول ها</h4>
                        <div class="table-responsive">
                            <table class="table text-center">
                                <thead>
                                <tr>
                                    <th class="text-white"> # </th>
                                    <th class="text-white"> نام </th>
                                    <th class="text-white"> ایجاد کننده </th>
                                    <th class="text-white"> ایمیل </th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($tables as $key => $table)
                                    <tr>
                                        <td class="text-white">{{$tables->firstItem() + $key}}</td>
                                        <td class="text-white"><a href="{{route('solve_table' , ['table'=>$table->id])}}" class="text-decoration-none">{{$table->name}}</a> </td>
                                        <td class="text-white">{{$table->user->name}}</td>
                                        <td class="text-white">{{$table->user->email}}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <div class="d-flex justify-content-center">
                <p>جدولی وجود ندارد.</p>
            </div>
        @endif
    </div>
    {{$tables->links()}}
@endsection
