import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap gap-8 mx-auto mt-8">
          {/* Sales Card */}
          <div className="tech-card p-8 w-[20rem] flex flex-col items-center text-center group hover:shadow-xl hover:glow-blue transition-all duration-300 relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaDollarSign size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 gradient-text">Total Sales</h3>
            <p className="text-tech-text-secondary mb-4">Total revenue generated</p>
            <h1 className="text-3xl font-bold text-tech-blue">
              {isLoading ? <Loader /> : `$${sales?.totalSales?.toLocaleString() || 0}`}
            </h1>
          </div>
          {/* Customers Card */}
          <div className="tech-card p-8 w-[20rem] flex flex-col items-center text-center group hover:shadow-xl hover:glow-purple transition-all duration-300 relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-r from-tech-emerald to-tech-cyan rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaUsers size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 gradient-text">Customers</h3>
            <p className="text-tech-text-secondary mb-4">Registered users</p>
            <h1 className="text-3xl font-bold text-tech-emerald">
              {isLoading ? <Loader /> : customers?.length || 0}
            </h1>
          </div>
          {/* Orders Card */}
          <div className="tech-card p-8 w-[20rem] flex flex-col items-center text-center group hover:shadow-xl hover:glow-pink transition-all duration-300 relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-r from-tech-pink to-tech-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaShoppingCart size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 gradient-text">All Orders</h3>
            <p className="text-tech-text-secondary mb-4">Total orders placed</p>
            <h1 className="text-3xl font-bold text-tech-pink">
              {isLoading ? <Loader /> : orders?.totalOrders || 0}
            </h1>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-4xl bg-tech-dark/60 rounded-2xl p-8 shadow-2xl backdrop-blur-xl border border-tech-blue/10">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
          />
        </div>
        <div className="mt-16">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;