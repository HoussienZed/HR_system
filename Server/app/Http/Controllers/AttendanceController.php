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
        // Validate input
        if (!$latitude || !$longitude) {
            return response()->json([
                'success' => false,
                'message' => 'Latitude and longitude are required.'
            ], 422);
        }
        // Prevent multiple clock-ins on the same day
        $alreadyClockedIn = Attendance::where('user_id', $user->id)
            ->whereDate('clock_in', now()->toDateString())
            ->first();
        if ($alreadyClockedIn) {
            return response()->json([
                'success' => false,
                'message' => 'You have already clocked in today.'
            ], 409);
        }
        // Get employee's approved work location
        $location = RemoteWorkLocation::where('user_id', $user->id)->first();
        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'No approved work location found.'
            ], 403);
        }
        // Calculate the distance between current and approved location
        $distance = $this->haversineDistance(
            $latitude,
            $longitude,
            $location->latitude,
            $location->longitude
        );
        // :closed_lock_with_key: Hardcoded radius in meters
        $radius = 300;
        if ($distance > $radius) {
            return response()->json([
                'success' => false,
                'message' => 'You are outside the allowed clock-in range.',
                'distance' => round($distance, 2) . ' meters'
            ], 403);
        }

        $location = new RemoteWorkLocation();

        // Save attendance record
        $attendance = new Attendance();
        $attendance->user_id = $user->id;
        $attendance->clock_in = now();

        // $location->latitude = $latitude;
        // $location->longitude = $longitude;
        // $attendance->latitude = $latitude;
        // $attendance->longitude = $longitude;
        // $attendance->location_verified = true;
        $attendance->save();
        // $location->save();
        return response()->json([
            'success' => true,
            'message' => 'Clocked in successfully.',
            'distance' => round($distance, 2)
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