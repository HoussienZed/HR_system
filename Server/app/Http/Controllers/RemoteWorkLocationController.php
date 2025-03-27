<?php

namespace App\Http\Controllers;

use App\Models\RemoteWorkLocation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RemoteWorkLocationController extends Controller
{
    public function addRemoteLocation(Request $request)
    {
        $user = Auth::user();

        $isUserJobRemote = $user->location === 'remote';

        if (!$isUserJobRemote) {
            return response()->json([
                'success' => false,
                'message' => $user->location
            ]);
        }

        $userRemoteLocation = RemoteWorkLocation::where('user_id', $user->id)
            ->first();

        $hasRemoteLocation = $userRemoteLocation ? true : false;

        if ($hasRemoteLocation) {
            return response()->json([
                'success' => false,
                'message' => "You already has specific remote location"
            ]);
        }

        $latitude = $request->latitude;
        $longitude = $request->longitude;

        if (!$latitude || !$longitude) {
            return response()->json([
                'success' => false,
                'message' => "Latitude and longitude are required."
            ]);
        }

        $remoteWorkLocation = new RemoteWorkLocation();
        $remoteWorkLocation->user_id = $user->id;
        $remoteWorkLocation->latitude = $latitude;
        $remoteWorkLocation->longitude = $longitude;
        $remoteWorkLocation->save();

        return response()->json([
            'success' => true,
            'message' => "You successfully added a remote location"
        ]);
    }
}
