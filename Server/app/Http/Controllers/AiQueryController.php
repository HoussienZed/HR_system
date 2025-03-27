<?php

namespace App\Http\Controllers;

use App\Models\AIQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AiQueryController extends Controller
{
    public function askGemini(Request $request)
    {
        $user = Auth::user();
        $message = $request->message;

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'input message is required'
            ]);
        }

        $endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY');

        $body = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $message]
                    ]
                ]
            ]
        ];

        $response = Http::post($endpoint, $body);

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'replay' => null
            ]);
        }

        $data = $response->json();

        $aiResponseMessage = $data['candidates'][0]['content']['parts'][0]['text'];

        $aiQuery = new AIQuery();
        $aiQuery->user_id = $user->id;
        $aiQuery->question = $request->message;
        $aiQuery->answer = $aiResponseMessage;
        $aiQuery->save();


        return response()->json([
            'success' => true,
            'reply' => $aiResponseMessage ?? "Sorry, no response from Gemini."
        ]);
    }
}
