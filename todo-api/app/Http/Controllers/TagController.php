<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    //
    public function index()
    {
        $tags = Tag::all();

        return ApiResponse::success($tags, 'All tags retrieved successfully');
    }
}
