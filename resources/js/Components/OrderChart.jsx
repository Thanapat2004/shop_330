// OrderChart.jsx
import Chart from "react-apexcharts";

const OrderChart = ({ orders }) => {
  // สร้างตัวแปรเพื่อเก็บจำนวนรวมของสินค้าต่อชิ้น
  const productQuantities = {};

  orders.forEach((order) => {
    order.order_details.forEach((detail) => {
      if (productQuantities[detail.product.name]) {
        productQuantities[detail.product.name] += detail.quantity;
      } else {
        productQuantities[detail.product.name] = detail.quantity;
      }
    });
  });

  // สร้างข้อมูลสำหรับกราฟ
  const productNames = Object.keys(productQuantities);
  const quantities = Object.values(productQuantities);

  // กำหนดการตั้งค่าของกราฟ
  const chartConfig = {
    type: "line", // ใช้ Bar Chart
    height: 240,
    series: [
      {
        name: "จำนวนสินค้า",
        data: quantities,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
    
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: productNames,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="w-full mb-8">
      <Chart {...chartConfig} />
    </div>
  );
};

export default OrderChart;
