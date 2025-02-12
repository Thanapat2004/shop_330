<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // //$pets = Pet::paginate(10);
        // $pets = Pet::all();
        // return response()->json([
        //     'susccess' => true,
        //     'message' => count($pets) > 0 ? 'Data found' : 'No data available',
        //     'count' => count($pets),
        //     'data' => $pets
        // ],200);
        $query = Pet::query();

        if ($request->filled('species')) { 
            $query->where('species', 'LIKE', "%{$request->species}%"); 
        } 
        if ($request->filled('age')) { 
            $query->where('age', $request->age); 
        } 
        if ($request->filled('status')) { 
            $query->where('status', $request->status); 
        }
        if ($request->filled('price_min')) { 
            $query->where('price', '>=', $request->price_min); 
        }
        if ($request->filled('price_max')) { 
            $query->where('price', '<=', $request->price_max); 
        } 

        $pets = $query->get(); 

        return response()->json([ 
            'success' => true, 
            'message' => count($pets) > 0 ? 'Data found' : 'No data available', 
            'count' => count($pets), 
            'data' => $pets 
        ], 200); 
    } 


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    log::info($request->all()); 

        // validate ข้อมูล 

        $request->validate([ 
            'name' => 'required', 
            'species' => 'required', 
            'price' => 'required', 
            'status' => 'required', 
        ]); 
        // สร้างข้อมูลใหม่ จากข้อมูลที่ผ่านการตรวจสอบแล้ว 
        $pet = Pet::create($request->all()); 
        // return json response 
        return response()->json([ 
            'success' => true, 
            'message' => 'Pet created successfully', 
            'data' => $pet 
        ], 201); 
}

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        return response()->json([
            'success' => true,
            'message' =>  'Pet data found',
            'data' => $pet
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pet $pet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet)
    {
        // ตรวจสอบข้อมูลที่ส่งมา
    $request->validate([
        'name' => 'required',
        'species' => 'required',
        'price' => 'required|numeric',
        'status' => 'required|in:available,sold',
    ]);

    // อัปเดตข้อมูล
    $pet->update($request->all());

    // ส่ง JSON กลับไป
    return response()->json([
        'success' => true,
        'message' => 'Pet updated successfully',
        'data' => $pet
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        $pet->delete();

    return response()->json([
        'success' => true,
        'message' => 'Pet deleted successfully'
    ], 200);
    }
}
