<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'leave_type' => 'required|in:annual,sick,unpaid,maternity,paternity',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        $leaveRequest = LeaveRequest::create($request->all());

        return messageResponse(true, 'Leave request submitted successfully', $leaveRequest, 201);
    }
}
