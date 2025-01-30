<?php

namespace Database\Factories;

use App\Models\Product;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        
        return [
            'name' => $this->faker->word(), // สุ่มชื่อสินค้า
            'description' => $this->faker->text, // สุ่มคำอธิบายสินค้า
            'price' => $this->faker->randomFloat(2, 10, 100), // สุ่มราคาสินค้า
            'stock' => $this->faker->numberBetween(1, 100), // สุ่มจำนวนสินค้า
        ];
    }
}
