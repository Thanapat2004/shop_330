import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Inertia } from "@inertiajs/inertia";
import ApplicationLogo from "@/Components/ApplicationLogo";
import OrderChart from "@/Components/OrderChart";
import PieChart from "@/Components/PieChart";

export default function Index({ orders }) {
  const [sortedOrders, setSortedOrders] = useState(orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    console.log("อัพเดทข้อมูลออเดอร์:", sortedOrders);
  }, [sortedOrders]);

  const sortByPrice = () => {
    setSortedOrders([...sortedOrders].sort((a, b) => a.total_amount - b.total_amount));
  };

  const sortByDate = () => {
    setSortedOrders([...sortedOrders].sort((a, b) => new Date(a.order_date) - new Date(b.order_date)));
  };

  const handleSortChange = (e) => {
    if (e.target.value === "price") sortByPrice();
    else if (e.target.value === "date") sortByDate();
  };

  const handleCreate = () => {
    Inertia.get(route("Shop.create"));
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selectedOrder) {
      console.error("ไม่มีข้อมูลออเดอร์ที่เลือก");
      alert("ข้อมูลออเดอร์จำเป็นต้องมี");
      return;
    }

    if (!selectedOrder.customer_id) {
      console.error("ไม่มีรหัสลูกค้า");
      alert("รหัสลูกค้าจำเป็นต้องมี");
      return;
    }

    if (!selectedOrder.order_date) {
      console.error("ไม่มีวันที่ออเดอร์");
      alert("วันที่ออเดอร์จำเป็นต้องมี");
      return;
    }

    console.log("บันทึกข้อมูลออเดอร์:", selectedOrder);

    Inertia.put(route("Shop.update", selectedOrder.id), {
      total_amount: selectedOrder.total_amount,
      status: selectedOrder.status,
      customer_id: selectedOrder.customer_id,
      order_date: selectedOrder.order_date,
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลออเดอร์นี้?")) {
      console.log("กำลังพยายามลบออเดอร์ ID:", id);

      Inertia.delete(route("Shop.destroy", id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (response) => {
          console.log("ลบออเดอร์สำเร็จ:", response);
        },
        onError: (errors) => {
          console.error("เกิดข้อผิดพลาดในการลบ:", errors);
          alert("ลบออเดอร์ไม่สำเร็จ: " + JSON.stringify(errors));
        },
      });
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-6">
      <div className="flex justify-center items-center mb-6">
        <ApplicationLogo className="w-20 h-20 text-green-600" />
      </div>

      <Typography variant="h5" color="blue-gray" className="font-bold text-center mb-6">
        รายการออเดอร์ทั้งหมด
      </Typography>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button color="green" onClick={handleCreate}>สร้างออเดอร์ใหม่</Button>
          <select
            id="sort-orders"
            onChange={handleSortChange}
            className="px-4 py-2 text-gray-900 bg-transparent border-none appearance-none rounded-md shadow-sm"
            title="เรียงลำดับออเดอร์"
            aria-label="เรียงลำดับออเดอร์ตามราคา หรือ วันที่"
          >
            <option value="">ลำดับ</option>
            <option value="price">ราคา</option>
            <option value="date">วันที่</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-6 mb-6">
        <OrderChart orders={orders} />
        <PieChart orders={orders} />
      </div>

      <Card className="w-full overflow-auto border-gray-300 p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold mb-4">
          รายละเอียดออเดอร์
        </Typography>

        <table className="w-full min-w-max table-auto text-left rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3">หมายเลขออเดอร์</th>
              <th className="p-3">วันที่</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3">ลูกค้า</th>
              <th className="p-3">อีเมล</th> {/* เพิ่มคอลัมน์ Email */}
              <th className="p-3">ยอดรวม</th>
              <th className="p-3">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{new Date(order.order_date).toLocaleString()}</td>
                <td className="p-2 text-blue-600">{order.status}</td>
                <td className="p-2">{order.customer.name}</td>
                <td className="p-2">{order.customer.email}</td> {/* แสดง email ของลูกค้า */}
                <td className="p-2 font-semibold text-gray-800">${order.total_amount}</td>
                <td className="p-2 flex space-x-2">
                  <Button color="blue" size="sm" onClick={() => handleEdit(order)}>แก้ไข</Button>
                  <Button color="red" size="sm" onClick={() => handleDelete(order.id)}>ลบ</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal สำหรับการแก้ไขข้อมูล */}
      {showModal && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h3 className="font-bold text-lg">แก้ไขออเดอร์</h3>
            <div className="mt-4">
              <label className="block">วันที่ออเดอร์</label>
              <input
                type="date"
                value={selectedOrder?.order_date ? formatDate(selectedOrder?.order_date) : ""}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, order_date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <label className="block">ยอดรวม</label>
              <input
                type="number"
                value={selectedOrder?.total_amount || ""}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, total_amount: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block">สถานะ</label>
              <input
                type="text"
                value={selectedOrder?.status || ""}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSave}
              >
                บันทึกการเปลี่ยนแปลง
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
