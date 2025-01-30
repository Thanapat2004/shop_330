<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Product extends Model

{  use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'stock']; // กำหนดให้สามารถเพิ่มข้อมูลได้ในสินค้า

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class); // 
    }
}
