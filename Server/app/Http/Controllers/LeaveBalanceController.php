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

    public function getTotalBalanceByType()
    {
        $totalBalances = LeaveBalance::selectRaw('leave_type, SUM(balance) as total_balance')
            ->groupBy('leave_type')
            ->get();

        return messageResponse(true, 'Fetched total balance by type successfully', 201, $totalBalances);
    }

    public function getOverallTotalBalance()
    {
        $totalBalance = LeaveBalance::sum('balance');
        return messageResponse(true, 'Fetched overall total balance successfully', 201, $totalBalance);
    }
}
