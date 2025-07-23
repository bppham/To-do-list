<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Note\CreationRequest;
use App\Http\Requests\Note\UpdationRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    //
    public function create(CreationRequest $request)
    {
        $todo = Todo::create([
            'user_id'     => Auth::id(),
            'title'       => $request->title,
            'description' => $request->description,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'repeat'      => $request->repeat,
        ]);

        if ($request->has('tag_ids')) {
            $todo->tags()->sync($request->tag_ids);
        }

        return ApiResponse::success(
            $todo->load('tags'),
            'Todo created successfully'
        );
    }
    public function index()
    {
        $todos = Todo::with('tags') // load tag
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return ApiResponse::success($todos, 'Todo list fetched successfully');
    }
    public function show($id)
    {
        $todo = Todo::with('tags') // load tag
            ->where('user_id', Auth::id())
            ->find($id);

        if (!$todo) {
            return ApiResponse::error(null, 'Todo not found', 404);
        }

        return ApiResponse::success($todo, 'Todo detail fetched');
    }
    public function update(UpdationRequest $request, $id)
    {
        $todo = Todo::where('user_id', Auth::id())->find($id);
        if (!$todo) {
            return ApiResponse::error(null, 'Todo not found', 404);
        }

        $todo->update($request->only(['title', 'description', 'start_date', 'end_date', 'repeat']));

        if ($request->has('tag_ids')) {
            $todo->tags()->sync($request->tag_ids);
        }

        return ApiResponse::success($todo->load('tags'), 'Todo updated successfully');
    }
    public function destroy($id)
    {
        $todo = Todo::where('user_id', Auth::id())->find($id);
        if (!$todo) {
            return ApiResponse::error(null, 'Todo not found', 404);
        }
        $todo->delete();
        return ApiResponse::success(null, 'Todo deleted successfully');
    }
    public function toggleIsDone($id)
    {
        $todo = Todo::where('user_id', Auth::id())->find($id);
        if (!$todo) {
            return ApiResponse::error(null, 'Todo not found', 404);
        }

        $todo->is_done = !$todo->is_done;
        $todo->save();

        return ApiResponse::success($todo, 'Todo status toggled successfully');
    }
}
