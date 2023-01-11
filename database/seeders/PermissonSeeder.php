<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissonSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('id', 1)->first();
        $role = Role::create(['name' => 'Super Manajer']);
        Role::create(['name' => 'Manajer']);
        Permission::create(['name' => 'panel.staff']);
        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
    }
}
