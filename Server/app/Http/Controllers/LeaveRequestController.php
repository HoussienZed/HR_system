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

        return messageResponse(true, 'Leave request submitted successfully', 201, $leaveRequest);
    }

    public function index()
    {
        $leaveRequests = LeaveRequest::with('user')->get();
        return messageResponse(true, 'successfully got leave requests', 201, $leaveRequests);
    }

    public function UpdateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $leaveRequest = LeaveRequest::findOrFail($id);
        $leaveRequest->update(['status' => $request->status]);

        return messageResponse(true, 'Leave request updated successfully', 201, $leaveRequest);
    }

    public function getUpcomingLeaves()
    {
        $upcomingLeaves = LeaveRequest::with('user')
            ->where('start_date', '>=', now()->toDateString())
            ->orderBy('start_date', 'asc')
            ->get();

        return messageResponse(true, 'Fetched upcoming leaves successfully', 201, $upcomingLeaves);
    }
}
