<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class OwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owners = [
            [
                'name' => 'Jollibee Owner',
                'first_name' => 'Jollibee',
                'last_name' => 'Owner',
                'email' => 'jollibee@tmcfoodhub.com',
                'password' => 'jollibee123',
                'role' => 'partner',
                'restaurant_name' => 'Jollibee',
                'business_address' => 'SM City, North Reclamation Area, Cebu City',
                'business_contact_number' => '+63 32 234 5678',
            ],
            [
                'name' => 'McDonald\'s Owner',
                'first_name' => 'McDonald\'s',
                'last_name' => 'Owner',
                'email' => 'mcdo@tmcfoodhub.com',
                'password' => 'mcdo123',
                'role' => 'partner',
                'restaurant_name' => 'McDonald\'s',
                'business_address' => 'Ayala Center Cebu, Archbishop Reyes Ave.',
                'business_contact_number' => '+63 32 888 1234',
            ],
            [
                'name' => 'Sushi Nori Owner',
                'first_name' => 'Sushi',
                'last_name' => 'Nori',
                'email' => 'sushinori@tmcfoodhub.com',
                'password' => 'sushi123',
                'role' => 'partner',
                'restaurant_name' => 'Sushi Nori',
                'business_address' => 'Cebu IT Park, Lahug, Cebu City',
                'business_contact_number' => '+63 32 411 9900',
            ],
            [
                'name' => 'Mang Inasal Owner',
                'first_name' => 'Mang',
                'last_name' => 'Inasal',
                'email' => 'manginasal@tmcfoodhub.com',
                'password' => 'inasal123',
                'role' => 'partner',
                'restaurant_name' => 'Mang Inasal',
                'business_address' => 'Colon Street, Downtown, Cebu City',
                'business_contact_number' => '+63 32 256 7788',
            ],
            [
                'name' => 'KFC Owner',
                'first_name' => 'KFC',
                'last_name' => 'Owner',
                'email' => 'kfc@tmcfoodhub.com',
                'password' => 'kfc123',
                'role' => 'partner',
                'restaurant_name' => 'KFC',
                'business_address' => 'Cebu IT Park, Lahug, Cebu City',
                'business_contact_number' => '+63 32 412 1234',
            ],
            [
                'name' => 'Chowking Owner',
                'first_name' => 'Chowking',
                'last_name' => 'Owner',
                'email' => 'chowking@tmcfoodhub.com',
                'password' => 'chowking123',
                'role' => 'partner',
                'restaurant_name' => 'Chowking',
                'business_address' => 'SM City Cebu',
                'business_contact_number' => '+63 32 234 9999',
            ],
        ];

        foreach ($owners as $ownerData) {
            User::updateOrCreate(
                ['email' => $ownerData['email']],
                [
                    'name' => $ownerData['name'],
                    'first_name' => $ownerData['first_name'],
                    'last_name' => $ownerData['last_name'],
                    'password' => Hash::make($ownerData['password']),
                    'role' => $ownerData['role'],
                    'restaurant_name' => $ownerData['restaurant_name'],
                    'business_address' => $ownerData['business_address'],
                    'business_contact_number' => $ownerData['business_contact_number'],
                ]
            );
        }
    }
}
