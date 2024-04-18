@extends('layouts.home' , ['sectionName' => 'حل کنندگان جدول ها'])

@section('title' , 'حل کنندگان جدول ها')

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
        @if($solvers->isNotEmpty())
            <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">جدول ها</h4>
                        <div class="solver-responsive">
                            <table class="table text-center">
                                <thead>
                                <tr>
                                    <th class="text-white"> # </th>
                                    <th class="text-white"> حل کننده </th>
                                    <th class="text-white"> شماره همراه </th>
                                    <th class="text-white"> نام جدول </th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($solvers as $key => $solver)
                                    <tr>
                                        <td class="text-white">{{$solvers->firstItem() + $key}}</td>
                                        <td class="text-white">{{$solver->name}}</td>
                                        <td class="text-white">{{$solver->number}}</td>
                                        <td class="text-white"><a href="{{route('solve_table' , ['table'=>$solver->table->id])}}" class="text-decoration-none">{{$solver->table->name}}</a></td>
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
    {{$solvers->links()}}
@endsection
