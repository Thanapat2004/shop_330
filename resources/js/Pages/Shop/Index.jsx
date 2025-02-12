import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Inertia } from "@inertiajs/inertia";
import ApplicationLogo from "@/Components/ApplicationLogo";
import OrderChart from "@/Components/OrderChart";
import PieChart from "@/Components/PieChart";
import "@fontsource/noto-sans-thai";

export default function Index({ orders }) {
    const [sortedOrders, setSortedOrders] = useState(orders);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(
        () => console.log("อัพเดทข้อมูลออเดอร์:", sortedOrders),
        [sortedOrders]
    );

    const filteredOrders = sortedOrders.filter(
        (order) =>
            order.customer.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.customer.email
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.id.toString().includes(searchQuery)
    );

    const handleSort = (type) => {
        const sorted = [...sortedOrders].sort((a, b) =>
            type === "price"
                ? a.total_amount - b.total_amount
                : new Date(a.order_date) - new Date(b.order_date)
        );
        setSortedOrders(sorted);
    };

    const handleSave = () => {
        if (!selectedOrder?.customer_id || !selectedOrder?.order_date)
            return alert("ข้อมูลออเดอร์จำเป็นต้องมี");
        Inertia.put(route("Shop.update", selectedOrder.id), selectedOrder);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col min-h-screen p-6 space-y-6 bg-gray-100">
            <div className="flex justify-center items-center mb-6">
                <ApplicationLogo className="w-20 h-20 text-green-600" />
            </div>
            <Card className="w-full p-6 shadow-lg rounded-xl bg-white border border-gray-300">
                <Typography
                    variant="lead"
                    color="green"
                    className="font-bold text-lg mb-4 border-b pb-2 text-center"
                >
                    สรุปยอดขาย
                </Typography>
                <p className="text-sm text-gray-500 text-center mb-4">
                    แสดงจำนวนสินค้าทั้งหมดที่ถูกสั่งซื้อในระบบ
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 shadow-md rounded-lg bg-gray-50">
                        <OrderChart orders={orders} />
                    </Card>
                    <Card className="p-6 shadow-md rounded-lg bg-gray-50">
                        <PieChart orders={orders} />
                    </Card>
                </div>
            </Card>

            <Card className="w-full p-6 shadow-lg rounded-xl bg-white border border-gray-300 overflow-x-auto">
                <Typography
                    variant="lead"
                    color="green"
                    className="font-bold text-lg mb-4 border-b pb-2 text-center"
                >
                    รายละเอียดของ Orders
                </Typography>
                <p className="text-sm text-gray-500 text-center mb-4">
                    ข้อมูลทั้งหมดที่ลูกค้าทำรายการ
                </p>
                
                <div className="flex flex-col md:flex-row justify-center items-center mb-6 bg-white p-4 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-4">
                    <h3 className=" text-gray-500 text-sm">สร้างคำสั่งซื้อใหม่ :</h3>
                    <Button
                        color="green"
                        className="shadow-md"
                        onClick={() => Inertia.get(route("Shop.create"))}
                    >
                        สร้างออเดอร์ใหม่ +
                    </Button>
                    <h3 className=" text-gray-500 text-sm">เรียงลำดับ :</h3>
                    <select
                        onChange={(e) => handleSort(e.target.value)}
                        className="rounded-lg bg-green-500 text-white border p-2 border-green-300 shadow-lg md:space-y-0 md:space-x-4 fucus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="" className="text-gray-500">
                            ลำดับ
                        </option>
                        <option value="price" className="text-green-600">
                            ราคา
                        </option>
                        <option value="date" className="text-purple-600">
                            วันที่
                        </option>
                    </select>
                </div>

                <table className="w-full table-auto text-left rounded-lg overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-green-400 text-white">
                            {[
                                "OrderID#",
                                "วันที่ (date)",
                                "สถานะ (status)",
                                "ลูกค้า (customers)",
                                "อีเมล (email)",
                                "ยอดรวม (total)",
                                "การจัดการ",
                            ].map((h) => (
                                <th key={h} className="p-3 text-center">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-gray-200 hover:bg-blue-50 transition-all text-center"
                            >
                                <td className="p-3 text-green-600 font-semibold bg-gray-100">{order.id}</td>
                                <td className="p-3 text-gray-500 font-semibold bg-gray-100">
                                    {new Date(
                                        order.order_date
                                    ).toLocaleString()}
                                </td>
                                <td className="p-3 bg-gray-100">
                                    <span
                                        className={`px-2 py-1 rounded text-white font-semibold ${
                                            order.status === "completed"
                                                ? "bg-green-400/80"
                                                : order.status === "pending"
                                                ? "bg-blue-400/80"
                                                : "bg-red-400/80"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-500 font-semibold bg-gray-100">{order.customer.name}</td>
                                <td className="p-3 text-gray-500 font-semibold bg-gray-100">{order.customer.email}</td>
                                <td className="p-3 font-semibold text-green-600 bg-gray-100">
                                  THB:{order.total_amount} บาท
                                </td>
                                <td className="p-3 flex justify-center space-x-2 bg-gray-100">
                                    <Button
                                        color="green"
                                        size="sm"
                                        className="shadow-md"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowModal(true);
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button
                                        color="red"
                                        size="sm"
                                        className="shadow-md"
                                        onClick={() =>
                                            Inertia.delete(
                                                route("Shop.destroy", order.id)
                                            )
                                        }
                                    >
                                        ลบ
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="font-bold text-lg border-b pb-2">
                            แก้ไขออเดอร์
                        </h3>
                        {["order_date", "total_amount", "status"].map(
                            (field) => (
                                <div key={field} className="mt-4">
                                    <label className="block text-sm font-semibold">
                                        {field === "order_date"
                                            ? "วันที่ออเดอร์"
                                            : field === "total_amount"
                                            ? "ยอดรวม"
                                            : "สถานะ"}
                                    </label>
                                    <input
                                        type={
                                            field === "order_date"
                                                ? "date"
                                                : "text"
                                        }
                                        value={selectedOrder?.[field] || ""}
                                        onChange={(e) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                [field]: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )
                        )}
                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                color="blue"
                                className="shadow-md"
                                onClick={handleSave}
                            >
                                บันทึก
                            </Button>
                            <Button
                                color="gray"
                                className="shadow-md"
                                onClick={() => setShowModal(false)}
                            >
                                ยกเลิก
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
