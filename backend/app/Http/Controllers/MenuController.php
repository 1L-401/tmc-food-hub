<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\RestaurantOwner;
use App\Models\MenuItem;

class MenuController extends Controller
{
    public function show($restaurantId)
    {
        $restaurant = RestaurantOwner::findOrFail($restaurantId);
        
        $menuByCategories = MenuItem::where('restaurant_owner_id', $restaurantId)
            ->with('category')
            ->get()
            ->groupBy(function($item) {
                return $item->category ? $item->category->name : 'Uncategorized';
            });

        return response()->json([
            'restaurant' => $restaurant,
            'menu' => $menuByCategories
        ]);
    }
}
