<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\RestaurantOwner;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Fetch orders for the authenticated user.
     *
     * - Customer (User model with role='customer'): sees only their own orders.
     * - Restaurant Owner (RestaurantOwner model): sees only orders assigned to them by ID.
     * - Secure fallback: any unrecognised actor gets a 403.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Order::with(['items', 'customer'])->orderBy('created_at', 'desc');

        if ($user instanceof RestaurantOwner) {
            // Owner sees only orders targeted at their restaurant by FK
            $query->where('restaurant_owner_id', $user->id);
        } elseif ($user->role === 'customer') {
            // Customer sees only their own placed orders
            $query->where('customer_id', $user->id);
        } else {
            // Block unrecognised roles from seeing any orders
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orders = $query->get();
        return response()->json($orders);
    }

    /**
     * Place a new order.
     * Requires restaurantId to link order to the correct restaurant owner by FK.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant'           => 'required|string',
            'restaurantId'         => 'required|integer|exists:restaurant_owners,id',
            'subtotal'             => 'required|numeric|min:0',
            'deliveryFee'          => 'required|numeric|min:0',
            'discount'             => 'required|numeric|min:0',
            'total'                => 'required|numeric|min:0',
            'paymentMethod'        => 'required|string',
            'deliveryAddress'      => 'required|string',
            'contactNumber'        => 'required|string',
            'specialInstructions'  => 'nullable|string',
            'deliveryType'         => 'required|string|in:asap,scheduled',
            'scheduledDate'        => 'nullable|required_if:deliveryType,scheduled|date|after_or_equal:today',
            'scheduledTime'        => 'nullable|required_if:deliveryType,scheduled|string',
            'items'                => 'required|array|min:1',
            'items.*.name'         => 'required|string',
            'items.*.quantity'     => 'required|integer|min:1',
            'items.*.price'        => 'required|numeric|min:0',
            'items.*.image'        => 'nullable|string',
            'items.*.variations'   => 'nullable|array',
        ]);

        $userId = $request->user()->id;

        $order = Order::create([
            'customer_id'          => $userId,
            'restaurant_owner_id'  => $validated['restaurantId'],
            'store_name'           => $validated['restaurant'],
            'subtotal'             => $validated['subtotal'],
            'delivery_fee'         => $validated['deliveryFee'],
            'discount'             => $validated['discount'],
            'total'                => $validated['total'],
            'payment_method'       => $validated['paymentMethod'],
            'delivery_address'     => $validated['deliveryAddress'],
            'contact_number'       => $validated['contactNumber'],
            'special_instructions' => $validated['specialInstructions'] ?? null,
            'delivery_type'        => $validated['deliveryType'],
            'scheduled_date'       => $validated['scheduledDate'] ?? null,
            'scheduled_time'       => $validated['scheduledTime'] ?? null,
            'status'               => 'Order Placed',
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'item_name'  => $item['name'],
                'quantity'   => $item['quantity'],
                'price'      => $item['price'],
                'image'      => $item['image'] ?? null,
                'variations' => isset($item['variations']) ? json_encode($item['variations']) : null,
            ]);
        }

        Log::info('Order placed successfully', [
            'order_id'            => $order->id,
            'customer_id'         => $userId,
            'restaurant_owner_id' => $order->restaurant_owner_id,
        ]);

        return response()->json($order->load('items'), 201);
    }

    /**
     * Update order status.
     * Owners can only update orders that belong to their restaurant (FK check).
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Order Placed,Order Confirmed,Out for Delivery,Delivered,Cancelled',
        ]);

        $order = Order::findOrFail($id);
        $user  = $request->user();

        // Owners: strict FK-based ownership check
        if ($user instanceof RestaurantOwner) {
            if ($order->restaurant_owner_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        } elseif ($user->role === 'customer') {
            // Customers can only cancel their own orders
            if ($order->customer_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            if ($validated['status'] !== 'Cancelled') {
                return response()->json(['message' => 'Customers can only cancel orders'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order->update(['status' => $validated['status']]);

        return response()->json($order);
    }
}

