<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\RestaurantOwner;
use App\Models\Category;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jollibee = RestaurantOwner::where('restaurant_name', 'Jollibee')->first();

        if ($jollibee) {
            $categories = [
                'Chickenjoy Meals' => [
                    ['title' => 'Chickenjoy Solo', 'description' => '1-pc crispy fried chicken, regular fries & drinks.', 'price' => 3.50, 'image' => '/assets/images/service/jollibee/1pc-Chickenjoy-Solo.svg', 'stock_level' => 50],
                    ['title' => 'Chickenjoy 2-pc', 'description' => '2-pc fried chicken with rice and gravy.', 'price' => 5.80, 'image' => '/assets/images/service/jollibee/2pc-Chickenjoy-Solo.svg', 'stock_level' => 40],
                    ['title' => 'Chickenjoy Bucket 8-pc', 'description' => 'Family bucket of 8 crispy chicken pieces.', 'price' => 18.00, 'image' => '/assets/images/service/jollibee/Chickenjoy-Bucket-8pc.svg', 'stock_level' => 20],
                ],
                'Burgers & Sandwiches' => [
                    ['title' => 'Yumburger', 'description' => "Classic beef burger with Jollibee's signature sauce.", 'price' => 1.80, 'image' => '/assets/images/service/jollibee/Yumburger.svg', 'stock_level' => 100],
                    ['title' => 'Cheesy Yumburger', 'description' => 'Yumburger topped with melted American cheese.', 'price' => 2.30, 'image' => '/assets/images/service/jollibee/Cheesy-Yumburger.svg', 'stock_level' => 80],
                ],
                'Pasta & Rice' => [
                    ['title' => 'Jolly Spaghetti', 'description' => 'Sweet-style spaghetti with hotdog slices and cheese.', 'price' => 2.80, 'image' => '/assets/images/service/jollibee/Jolly-Spaghetti.svg', 'stock_level' => 60],
                    ['title' => 'Garlic Rice', 'description' => 'Fragrant garlic fried rice perfect with any meal.', 'price' => 1.50, 'image' => '/assets/images/service/jollibee/Garlic Rice.svg', 'stock_level' => 150],
                ],
                'Desserts & Drinks' => [
                    ['title' => 'Peach Mango Pie', 'description' => 'Flaky pastry filled with sweet peach and mango.', 'price' => 1.20, 'image' => '/assets/images/service/jollibee/Peach-Mango-Pie.svg', 'stock_level' => 0], // Out of stock example
                    ['title' => 'Jolly Sundae', 'description' => 'Creamy soft-serve in chocolate or strawberry.', 'price' => 1.00, 'image' => '/assets/images/service/jollibee/Jolly-Sundae.svg', 'stock_level' => 30],
                ]
            ];

            foreach ($categories as $catName => $items) {
                $category = Category::updateOrCreate(
                    ['restaurant_owner_id' => $jollibee->id, 'name' => $catName]
                );

                foreach ($items as $itemData) {
                    MenuItem::updateOrCreate(
                        ['restaurant_owner_id' => $jollibee->id, 'title' => $itemData['title']],
                        array_merge($itemData, [
                            'category_id' => $category->id,
                            'unit' => 'units',
                            'min_threshold' => 10,
                            'auto_toggle' => true,
                            'available' => $itemData['stock_level'] > 0
                        ])
                    );
                }
            }
        }
    }
}
