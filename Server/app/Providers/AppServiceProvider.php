<?php

namespace App\Providers;

use App\Events\LeaveRequestsApproved;
use App\Events\UserRegistered;
use App\Listeners\CreateLeaveBalance;
use App\Listeners\DeductLeaveBalance;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //listening on the user signup to create the users leave balance
        Event::listen(
            UserRegistered::class,
            CreateLeaveBalance::class
        );

        //listening on the leave request acceptance to deduct from leave balance
        Event::listen(
            LeaveRequestsApproved::class,
            DeductLeaveBalance::class
        );
    }
}
