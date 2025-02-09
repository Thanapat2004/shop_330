<?php

namespace App\Http\Controllers;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use DB;

class SystemOrderController extends Controller
{
    public function index()
    {
         
    $orders = Order::with(['customer', 'orderDetails.product'])->get();

    return Inertia::render('Shop/Index', [
        'orders' => $orders
    ]);
    }



    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'order_date' => 'required|date',
            'total_amount' => 'required|numeric|min:0',
            'details' => 'required|array',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.price' => 'required|numeric|min:0'
        ]);

        DB::transaction(function () use ($data) {
            $order = Order::create([
                'customer_id' => $data['customer_id'],
                'order_date' => $data['order_date'],
                'total_amount' => $data['total_amount'],
            ]);

            foreach ($data['details'] as $detail) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                ]);
            }
        });

        return redirect()->route('Shop.index')->with('success', 'Order created successfully');
    }

    public function show(Order $order)
    {
        // ดึงข้อมูลพร้อมกับ orderDetails และ product
    $order = $order->load(['orderDetails.product']);

    // ดึงข้อมูล order details ที่เชื่อมโยงกับ product
    $order = Order::with(['orderDetails.product'])->find($order->id);

    if (!$order) {
        return response()->json(['error' => 'Order not found'], 404);
    }

    // ส่งข้อมูลกลับในรูปแบบ JSON
    return response()->json($order);
    }



    public function update(Request $request, $id)
    {
        $order = Order::find($id);
    
        // ตรวจสอบว่าพบ order หรือไม่
        if (!$order) {
            return redirect()->route('Shop.index')->with('error', 'Order not found.');
        }
    
        // อัปเดตข้อมูล
        $order->update([
            'total_amount' => $request->total_amount,
            'status' => $request->status,
            'order_date' => $request->order_date,
            'email' => $request->email,
            'customer' => $request->customer
        ]);
    
        return redirect()->route('Shop.index')->with('success', 'Order updated successfully');
    }
    

    
    
    public function create()
    {
        return Inertia::render('Shop/Create', [
            'customers' => Customer::select('id', 'name')->get(),
            'products' => Product::select('id', 'name')->get()
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('Shop.index')->with('success', 'Order deleted successfully');
    }
}
