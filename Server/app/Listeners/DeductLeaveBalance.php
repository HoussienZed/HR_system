<?php

namespace App\Listeners;


use App\Events\LeaveRequestsApproved;
use App\Models\LeaveBalance;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeductLeaveBalance
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(LeaveRequestsApproved $event): void
    {
        $leaveRequest = $event->leaveRequest;

        //get the number of days for the leave
        $startDate = new \Carbon\Carbon($leaveRequest->start_date);
        $endDate = new \Carbon\Carbon($leaveRequest->end_date);
        $requestedDays = $startDate->diffInDays($endDate) -;

        //find the record of the user's leave balance
        $leaveBalance = LeaveBalance::where('user_id', $leaveRequest->user_id)
            ->where('leave_type', $leaveRequest->leave_type)
            ->first();

        //subtract the number of days
        if ($leaveBalance) {
            $leaveBalance->balance -= $requestedDays;
            $leaveBalance->save();
        }
    }
}
