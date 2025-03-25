<?php

namespace App\Http\Controllers;

use App\Models\LeaveBalance;
use Illuminate\Http\Request;

class LeaveBalanceController extends Controller
{
    public function getUserLeaveBalance($userId)
    {
        $leaveBalance = LeaveBalance::where('user_id', $userId)->get();
        return response()->json($leaveBalance);
    }
}
