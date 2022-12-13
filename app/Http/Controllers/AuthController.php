<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        if(auth()->check()) {
            return redirect()->route('panel.forms.index');
        }
        return inertia('Auth/LoginPage');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return back()->withErrors(['email' => 'Invalid login details']);
        }

        return redirect()->route('panel.forms.index')->with('success', 'Logged in successfully');
    }

    public function forceLoginAdmin()
    {
        if(app()->environment('local')) {
            auth()->loginUsingId(1);
            return redirect()->route('panel.dashboard');
        }
        return redirect()->route('login');
    }

    public function logout()
    {
        auth()->logout();
        return redirect()->route('login');
    }
}
