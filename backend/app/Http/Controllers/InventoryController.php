<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Auth;

class InventoryController extends Controller
{
    public function getCategories()
    {
        $owner = Auth::user();
        $categories = Category::where('restaurant_owner_id', $owner->id)->get();
        return response()->json($categories);
    }

    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $owner = Auth::user();

        $category = Category::create([
            'restaurant_owner_id' => $owner->id,
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

    public function destroyCategory($id)
    {
        $owner = Auth::user();
        $category = Category::where('restaurant_owner_id', $owner->id)->findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }


    public function getMenuItems()
    {
        $owner = Auth::user();
        $items = MenuItem::where('restaurant_owner_id', $owner->id)->with('category')->get();
        
        // Convert binary images to base64 for response
        $response = $items->map(function ($item) {
            $itemArray = $item->toArray();
            if ($itemArray['image'] && !empty($itemArray['image'])) {
                $mimeType = $this->detectMimeType($item->image);
                $itemArray['image'] = 'data:' . $mimeType . ';base64,' . base64_encode($item->image);
            }
            return $itemArray;
        });
        
        return response()->json($response);
    }

    private function detectMimeType($binaryData)
    {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_buffer($finfo, $binaryData);
        finfo_close($finfo);
        return $mimeType ?: 'image/jpeg';
    }

    public function storeMenuItem(Request $request)
    {
        $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'stock_level' => 'integer|min:0',
            'min_threshold' => 'integer|min:0',
            'unit' => 'string|max:50',
            'auto_toggle' => 'boolean',
        ]);

        $owner = Auth::user();
        $imageData = null;

        if ($request->hasFile('image_file')) {
            $imageData = file_get_contents($request->file('image_file')->getRealPath());
        }

        $item = MenuItem::create([
            'restaurant_owner_id' => $owner->id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imageData,
            'available' => $request->auto_toggle ? $request->stock_level > 0 : true,
            'stock_level' => $request->stock_level,
            'min_threshold' => $request->min_threshold,
            'unit' => $request->unit,
            'auto_toggle' => $request->auto_toggle,
        ]);

        // Prepare response with base64 encoded image
        $response = $item->toArray();
        if ($response['image'] && !empty($response['image'])) {
            $mimeType = $this->detectMimeType($item->image);
            $response['image'] = 'data:' . $mimeType . ';base64,' . base64_encode($item->image);
        }

        return response()->json($response, 201);
    }

    public function updateMenuItem(Request $request, $id)
    {
        $owner = Auth::user();
        $item = MenuItem::where('restaurant_owner_id', $owner->id)->findOrFail($id);

        $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'available' => 'boolean',
            'stock_level' => 'integer|min:0',
            'min_threshold' => 'integer|min:0',
            'unit' => 'string|max:50',
            'auto_toggle' => 'boolean',
        ]);

        $data = $request->except(['image_file', 'image']);
        
        if ($request->hasFile('image_file')) {
            $data['image'] = file_get_contents($request->file('image_file')->getRealPath());
        }

        if ($request->has('stock_level') && $request->auto_toggle) {
            $data['available'] = $request->stock_level > 0;
        }

        $item->update($data);

        // Prepare response with base64 encoded image
        $response = $item->toArray();
        if ($response['image'] && !empty($response['image'])) {
            $mimeType = $this->detectMimeType($item->image);
            $response['image'] = 'data:' . $mimeType . ';base64,' . base64_encode($item->image);
        }

        return response()->json($response);
    }

    public function updateStock(Request $request, $id)
    {
        $owner = Auth::user();
        $item = MenuItem::where('restaurant_owner_id', $owner->id)->findOrFail($id);

        $request->validate([
            'stock_level' => 'required|integer|min:0',
        ]);

        $updateData = ['stock_level' => $request->stock_level];
        if ($item->auto_toggle) {
            $updateData['available'] = $request->stock_level > 0;
        }

        $item->update($updateData);

        return response()->json($item);
    }

    public function toggleAvailability(Request $request, $id)
    {
        $owner = Auth::user();
        $item = MenuItem::where('restaurant_owner_id', $owner->id)->findOrFail($id);

        $request->validate([
            'available' => 'required|boolean',
        ]);

        $item->update(['available' => $request->available]);

        return response()->json($item);
    }

    public function destroyMenuItem($id)
    {
        $owner = Auth::user();
        $item = MenuItem::where('restaurant_owner_id', $owner->id)->findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Menu item deleted successfully.']);
    }
}
