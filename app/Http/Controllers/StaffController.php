<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class StaffController extends Controller
{
    public function index()
    {
        $staff = User::where('id', '!=', auth()->id())->
        latest()
            ->when(request('search'), function ($query) {
                $query->where(DB::raw('lower(name)'), 'like', '%' . strtolower(request('search')) . '%');
            })
            ->paginate(100)->withQueryString();
        return inertia('Panel/Staff/Staff', [
            'staff' => $staff->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => date('d/m/Y', strtotime($user->created_at)),
                    'updated_at' => $user->updated_at,
                    'role' => $user->getRoleNames()->first(),
                ];
            }),
        ]);
    }

    public function create()
    {
        $roles = DB::table('roles')->get();

        $staff = new User();
        return inertia('Panel/Staff/ManageStaff', [
            'staff' => $staff,
            'roles' => $roles,

        ]);
    }
    public function edit(User $user)
    {
        $roles = DB::table('roles')->get();
        return inertia('Panel/Staff/ManageStaff', [
            'staff' => $user,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);
        $staff = new User();
        $staff->name = $request->name;
        $staff->email = $request->email;
        $staff->password = bcrypt($request->password);
        $staff->save();
        $staff->assignRole($request->role);
        return redirect('/panel/staff')->with('success', 'Staff berhasil ditambahkan');
    }
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'nullable',
            'role' => 'required',
        ]);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
        $user->syncRoles($request->role);
        return redirect('/panel/staff')->with('success', 'Staff berhasil diubah');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect('/panel/staff')->with('success', 'Staff berhasil dihapus');
    }
}