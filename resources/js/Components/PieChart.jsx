import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

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
      case "cancelled":
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
    width: 500,
    height: 500,
    series: Object.values(statusCounts),
    options: {
      chart: { toolbar: { show: false } },
      dataLabels: { enabled: false },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      labels: ["Completed", "In Progress", "Pending", "Cancelled", "Issues"],
      legend: { show: true },
    },
  };

  return (
    <Card>
      <CardHeader floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
        <Typography variant="h6" color="blue-gray">
          Order Status Distribution
        </Typography>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default OrderChart;
