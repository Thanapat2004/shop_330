import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button, Card, Typography } from "@material-tailwind/react";
import "@fontsource/noto-sans-thai";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Create({ customers, products }) {
  const [form, setForm] = useState({
    customer_id: "",  // เก็บ ID ของลูกค้าที่เลือก
    order_date: "",   // เก็บวันที่การสั่งซื้อ
    total_amount: 0,  // เก็บยอดรวมทั้งหมด
    details: [],      // เก็บข้อมูลสินค้าที่เลือกสำหรับการสั่งซื้อ
  });

  // ฟังก์ชั่นสำหรับการเพิ่มสินค้าลงในรายละเอียดคำสั่งซื้อ
  const addProduct = () => {
    setForm({
      ...form,
      details: [...form.details, { product_id: "", quantity: 1, price: 0 }],  // เพิ่มสินค้าใหม่ในรายละเอียด
    });
  };

  // ฟังก์ชั่นคำนวณราคารวมจากรายละเอียดสินค้าที่เลือก
  const calculateTotalAmount = (details) => {
    return details.reduce((total, item) => total + item.quantity * item.price, 0); // คำนวณยอดรวมจากราคาสินค้าและจำนวน
  };

  // ฟังก์ชั่นสำหรับการส่งข้อมูลฟอร์มเมื่อกดปุ่ม submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForm = { ...form, total_amount: calculateTotalAmount(form.details) }; // คำนวณยอดรวมและเพิ่มใน form
    console.log("Form Data:", updatedForm);  // แสดงข้อมูลฟอร์มที่เตรียมจะส่ง
    Inertia.post(route("Shop.store"), updatedForm);  // ส่งข้อมูลไปยังเซิร์ฟเวอร์
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-10">
      <div className="flex justify-center items-center mb-6">
                      <ApplicationLogo className="w-20 h-20 text-green-600" />
                  </div>
      <Typography variant="h4" color="green" className="mb-6 text-center font-semibold">
        สร้างคำสั่งซื้อใหม่  {/* ชื่อหัวข้อของฟอร์ม */}
      </Typography>
      <p className="text-center text-gray-500 mb-6"> การสร้างคำสั่งซื้อใหม่โดยเลือกลูกค้าและสินค้าที่ต้องการ</p>  

      <Card className="p-6 w-full max-w-3xl mx-auto shadow-xl rounded-lg bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* เลือกลูกค้า */}
          <div className="space-y-2">
            <label className="block text-gray-500 font-bold">ลูกค้า</label>  {/* เลขเลือกสำหรับลูกค้า */}
            <select
              value={form.customer_id}
              onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
              className="w-full p-3 border border-green-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">เลือกลูกค้า</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}  {/* แสดงชื่อของลูกค้า */}
                </option>
              ))}
            </select>
          </div>

          {/* เลือกวันที่ */}
          <div className="space-y-2">
            <label className="block text-gray-500 border-green-500 font-bold">วันที่คำสั่งซื้อ</label>  {/* เลขเลือกสำหรับวันที่ */}
            <input
              type="date"
              value={form.order_date}
              onChange={(e) => setForm({ ...form, order_date: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* เลือกสินค้า */}
          <div className="space-y-4">
            <label className="block text-gray-500 font-bold">สินค้า</label>  {/* ชื่อสำหรับสินค้าที่เลือก */}
            {form.details.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center mb-4">
                {/* เลือกสินค้าจากรายการที่มี */}
                <select
                  value={item.product_id}
                  onChange={(e) => {
                    const newDetails = [...form.details];
                    newDetails[index].product_id = e.target.value;
                    setForm({ ...form, details: newDetails });
                  }}
                  className="p-3 border border-green-300 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">เลือกสินค้า</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}  {/* แสดงชื่อสินค้าจาก products */}
                    </option>
                  ))}
                </select>

                {/* กรอกจำนวนสินค้า */}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => {
                    const newDetails = [...form.details];
                    newDetails[index].quantity = parseInt(e.target.value) || 1;
                    setForm({ ...form, details: newDetails });
                  }}
                  className="w-24 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="จำนวน"
                />

                {/* กรอกราคาสินค้า */}
                <input
                  type="number"
                  value={item.price}
                  min="0"
                  onChange={(e) => {
                    const newDetails = [...form.details];
                    newDetails[index].price = parseFloat(e.target.value) || 0;
                    setForm({ ...form, details: newDetails });
                  }}
                  className="w-32 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ราคา"
                />
              </div>
            ))}
             {/* แสดงราคารวม */}
          <div className="text-right">
            <Typography variant="h6" className="font-mediumborder-b border-green-500">
              ยอดรวม: {calculateTotalAmount(form.details).toFixed(2)} บาท  {/* แสดงยอดรวมทั้งหมด */}
            </Typography>
          </div>
            {/* ปุ่มเพิ่มสินค้า */}
            <Button color="blue" onClick={addProduct} className="w-full py-4 mt-4">
              เพิ่มสินค้า  {/* ปุ่มสำหรับเพิ่มสินค้าใหม่ */}
            </Button>
          </div>

         

          {/* ปุ่ม Submit */}
          <Button type="submit" color="green" className="w-full py-4 mt-4">
            สร้างคำสั่งซื้อ  {/* ปุ่มสำหรับส่งข้อมูลคำสั่งซื้อ */}
          </Button>
        </form>
      </Card>
    </div>
  );
}
