<?php

namespace App\Http\Controllers;

use App\Http\Requests\TableRequest;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class TableController extends Controller
{
    public function index()
    {
        $tables = auth()->user()->tables()->paginate(10);
        return view('tables.index' , compact('tables'));
    }

    public function create()
    {
        return view('tables.create');
    }

    public function store(TableRequest $request)
    {
        try
        {
            DB::beginTransaction();

                $table = Table::create([
                    'name' => $request->name,
                    'user_id' => auth()->id()
                ]);

                for ($i = 0; $i < count($request->rows['question']); $i++)
                {
                    $table->rows()->create([
                        'question' => $request->rows['question'][$i],
                        'answer' => $request->rows['answer'][$i],
                        'keyword1' => $request->rows['keyword1'][$i] ?? 0,
                        'keyword2' => $request->rows['keyword2'][$i] ?? 0,
                        'keyword3' => $request->rows['keyword3'][$i] ?? 0,
                    ]);
                }

            DB::commit();
        }
        catch (Exception $e)
        {
            DB::rollBack();
            return back()->with('message','اطلاعات ثبت نشد.');
        }
        return redirect()->route('tables.index')->with('message','جدول مورد نظر با موفقیت ثبت شد.');
    }

    public function edit(Table $table)
    {
        return view('tables.edit' , compact('table'));
    }

    public function update(TableRequest $request, Table $table)
    {
        try
        {
            DB::beginTransaction();

            $table->update([
                'name' => $request->name,
                'user_id' => auth()->id()
            ]);

            $table->rows()->delete();

            for ($i = 0; $i < count($request->rows['question']); $i++)
            {
                $table->rows()->create([
                    'question' => $request->rows['question'][$i],
                    'answer' => $request->rows['answer'][$i],
                    'keyword1' => $request->rows['keyword1'][$i] ?? 0,
                    'keyword2' => $request->rows['keyword2'][$i] ?? 0,
                    'keyword3' => $request->rows['keyword3'][$i] ?? 0,
                ]);
            }

            DB::commit();
        }
        catch (Exception $e)
        {
            DB::rollBack();
            return back()->with('message','اطلاعات ثبت نشد.');
        }
        return redirect()->route('tables.index')->with('message','جدول مورد نظر با موفقیت اپدیت شد.');

    }

    public function destroy(Table $table)
    {
        $table->delete();
        return back();
    }
}
