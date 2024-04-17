<?php

namespace App\Http\Controllers;

use App\Models\Solver;
use Illuminate\Http\Request;

class SolverController extends Controller
{
    public function index()
    {
        $solvers = Solver::paginate(10);
        return view('solvers' , compact('solvers'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'number' => 'required',
        ]);

        Solver::create([
            'name' => $request->name,
            'number' => $request->number,
            'table_id' => $request->table_id,
        ]);

        return redirect()->route('solvers.index')->with('message','جدول موردنطر با موفقیت حل شد.');
    }
}
