<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    public function me()
    {
        $user = Auth::user();

        $notes = Todo::where('user_id', $user->id)->get();

        $total = $notes->count();
        $completed = $notes->where('is_done', true)->count();
        $incompleted = $notes->where('is_done', false)->count();
        $expired = $notes->where('is_done', false)
            ->where('end_date', '<', Carbon::now())
            ->count();

        return ApiResponse::success([
            'user' => $user,
            'statistics' => [
                'total_notes' => $total,
                'completed_notes' => $completed,
                'incompleted_notes' => $incompleted,
                'expired_notes' => $expired,
            ]
        ], 'User profile and note statistics');
    }
}
