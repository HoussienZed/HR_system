<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\RemoteWorkLocation;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function clockIn(Request $request)
    {
        $user = Auth::user();
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        // validation
        if (!$latitude || !$longitude) {
            return response()->json([
                'success' => false,
                'message' => 'Latitude and longitude are required.'
            ]);
        }


        $alreadyClockedIn = Attendance::where('user_id', $user->id)
            ->whereNotNull('clock_in')
            ->whereNull('clock_out')
            ->first();

        if ($alreadyClockedIn) {
            return response()->json([
                'success' => false,
                'message' => 'You have already clocked in today.'
            ]);
        }


        // Get employee's approved work location
        $location = RemoteWorkLocation::where('user_id', $user->id)->first();
        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'No approved work location found.'
            ]);
        }

        // Calculate the distance between current and approved location
        $distance = $this->haversineDistance(
            $latitude,
            $longitude,
            $location->latitude,
            $location->longitude
        );


        $radius = 300;
        if ($distance > $radius) {
            return response()->json([
                'success' => false,
                'message' => 'You are outside the allowed clock-in range.',
                'distance' => round($distance, 2) . ' meters'
            ]);
        }


        // Save attendance record
        $attendance = new Attendance();
        $attendance->user_id = $user->id;
        $attendance->clock_in = now();
        $attendance->save();


        return response()->json([
            'success' => true,
            'message' => 'Clocked in successfully.',
            'distance' => round($distance, 2),
            'clockIn' => true
        ]);
    }

    public function clockOut()
    {
        $user = Auth::user();

        $attendance = Attendance::where('user_id', $user->id)
            ->whereNotNull('clock_in')
            ->whereNull('clock_out')
            ->first();

        if (!$attendance) {
            return response()->json([
                'success' => false,
                'message' => "No active clock-in found"
            ]);
        }

        $attendance->clock_out = now();
        $attendance->save();

        return response()->json([
            'success' => true,
            'message' => "You successfully clocked out"
        ]);
    }




    /**
     * Calculate the distance between two GPS coordinates using Haversine formula
     */
    private function haversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000; // Earth radius in meters
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);
        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;
        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos($lat1) * cos($lat2) *
            sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c; // Distance in meters
    }
}
