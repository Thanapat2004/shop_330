import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import "@fontsource/noto-sans-thai";

const OrderChart = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500">No order data available</p>;
  }

  const statusCounts = {
    completed: 0,
    inProgress: 0,
    pending: 0,
    cancelled: 0,
    issues: 0,
  };

  orders.forEach((order) => {
    switch (order.status) {
      case "completed":
        statusCounts.completed++;
        break;
      case "inProgress":
        statusCounts.inProgress++;
        break;
      case "pending":
        statusCounts.pending++;
        break;
      case "canceled":
        statusCounts.cancelled++;
        break;
      case "issues":
        statusCounts.issues++;
        break;
      default:
        break;
    }
  });

  const chartConfig = {
    type: "pie",
    series: Object.values(statusCounts),
    options: {
      chart: { 
        toolbar: { show: false }, 
        responsive: true, //  ทำให้กราฟปรับขนาดตามหน้าจอ
      },
      dataLabels: { enabled: false },
      colors: ["#4CAF50", "#FFB74D", "#42A5F5", "#E57373", "#9575CD"],
      labels: ["completed", "inProgress", "pending", "cancelled", "issues"],
      legend: { show: true, position: "bottom" }, // ให้ legend อยู่ข้างล่างในจอเล็ก
    },
  };

  return (
    <Card className="w-full max-w-2xl mx-auto"> {/*  ปรับให้ card ไม่กว้างเกินไป */}
      <CardHeader 
        floated={false} 
        shadow={false} 
        color="transparent" 
        className="flex flex-wrap justify-center gap-4 rounded-none md:flex-row md:items-center md:justify-between"
      >
        <Typography variant="h6" color="blue-gray" className="text-center md:text-left">
          สถานะคําสั่งซื้อ
        </Typography>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <div className="w-full max-w-[90%] md:max-w-[75%]">
          <Chart {...chartConfig} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderChart;
