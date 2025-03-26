<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Models\LeaveBalance;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateLeaveBalance
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
    public function handle(UserRegistered $event): void
    {
        $user = $event->user;

        $leaveTypes = ['annual', 'sick', 'unpaid', 'maternity', 'paternity'];

        foreach ($leaveTypes as $type) {
            LeaveBalance::create([
                'user_id' => $user->id,
                'leave_type' => $type,
                'balance' => 10,
            ]);
        }
    }
}
