<?php

namespace App\Http\Controllers;

use App\Events\LeaveRequestsApproved;
use App\Models\LeaveBalance;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'leave_type' => 'required|in:annual,sick,unpaid,maternity,paternity',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after_or_equal:start_date',
                'reason' => 'nullable|string',
            ]);

            //the carbon turns the date to a string
            $startDate = new \Carbon\Carbon($request->start_date);
            $endDate = new \Carbon\Carbon($request->end_date);
            $requestedDays = $startDate->diffInDays($endDate) + 1;

            //check if user has enough leave balance
            $leaveBalance = LeaveBalance::where('user_id', $request->user_id)
                ->where('leave_type', $request->leave_type)
                ->first();

            if (!$leaveBalance || $leaveBalance->balance < $requestedDays) {
                return errorMessageResponse(false, 'Insufficient balance error ', 'You dont have enough leave balance for ' . $request->leave_type, 400);
            }

            $leaveRequest = LeaveRequest::create($request->all());

            return messageResponse(true, 'Leave request submitted successfully', 201, $leaveRequest);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Server error',
                'message' => $e->getMessage()
            ], 500);
        }
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

        $leaveRequest = LeaveRequest::where('id', $id)->firstOrFail();
        $leaveRequest->update(['status' => $request->status]);

        //if approved fire event to deduct from leave balance
        if ($request->status === 'approved') {
            event(new LeaveRequestsApproved($leaveRequest));
        }

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

    public function getUserLeaveRequests($userId)
    {
        $leaveRequests = LeaveRequest::where('user_id', $userId)->get();
        return messageResponse(true, 'Fetched leave requests successfully', 201, $leaveRequests);
    }
}
