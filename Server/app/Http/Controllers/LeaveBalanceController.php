<?php

namespace App\Http\Controllers;

use App\Models\LeaveBalance;
use Illuminate\Http\Request;

class LeaveBalanceController extends Controller
{
    public function getUserLeaveBalance($userId)
    {
        $leaveBalance = LeaveBalance::where('user_id', $userId)->get();
        return messageResponse(true, 'Fetched user leave balance successfully', 201, $leaveBalance);
    }

    public function getAllUsersLeaveBalance()
    {
        $leavesBalances = LeaveBalance::with('user')->get();
        return messageResponse(true, 'Fetched all users leave balance successfully', 201, $leavesBalances);
    }
}
