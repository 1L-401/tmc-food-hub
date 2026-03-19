<?php

use App\Models\MenuItem;
use App\Models\Category;
use App\Models\RestaurantOwner;

$owner = RestaurantOwner::first();
$cat = Category::where('restaurant_owner_id', $owner->id)->first();

if (!$cat) {
    $cat = Category::create([
        'restaurant_owner_id' => $owner->id,
        'name' => 'Test Category'
    ]);
}

// Test with a simple text image (URL)
try {
    $item = MenuItem::create([
        'restaurant_owner_id' => $owner->id,
        'category_id' => $cat->id,
        'title' => 'Test Item',
        'description' => 'Test Description',
        'price' => 10.50,
        'image' => null,
        'available' => true,
        'stock_level' => 50,
        'min_threshold' => 10,
        'unit' => 'units',
        'auto_toggle' => true,
    ]);

    echo "Item created successfully: " . $item->id . "\n";
    
    $response = $item->toArray();
    echo "Response: " . json_encode($response) . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
