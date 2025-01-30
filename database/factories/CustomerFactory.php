<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Customer::class; // กำหนดค่า $model ให้ตรงกับ Customer
    public function definition(): array
    {
        
        return  [
            'name' => $this->faker->name, // สุ่มชื่อของลูกค้า
            'email' => $this->faker->unique()->safeEmail, // สุ่มอีเมลล์ของลูกค้า
            'address' => $this->faker->address, // สุ่มที่อยู่ของลูกค้า
        ];
    }
}
