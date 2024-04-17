<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $tables = Table::paginate(10);
        return view('index' , compact('tables'));
    }

    public function solve_table(Table $table)
    {
        $table->load('rows');
        return view('table_for_solve' , compact('table'));
    }

}
