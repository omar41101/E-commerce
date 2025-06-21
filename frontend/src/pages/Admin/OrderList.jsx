import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  // Defensive: ensure orders is an array
  const orderArray = Array.isArray(orders) ? orders : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-black py-12">
      <div className="tech-card w-full max-w-5xl p-6 md:p-10 shadow-xl border border-tech-blue/10 backdrop-blur-xl mx-auto">
        <h1 className="text-2xl font-display font-bold mb-6 text-center text-tech-blue">Order List</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : orderArray.length === 0 ? (
          <p className="text-center text-tech-text-secondary">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-tech-white text-sm">
              <thead>
                <tr className="border-b border-tech-blue/10">
                  <th className="py-3 px-2 text-left font-semibold">ITEMS</th>
                  <th className="py-3 px-2 text-left font-semibold">ID</th>
                  <th className="py-3 px-2 text-left font-semibold">USER</th>
                  <th className="py-3 px-2 text-left font-semibold">DATE</th>
                  <th className="py-3 px-2 text-left font-semibold">TOTAL</th>
                  <th className="py-3 px-2 text-left font-semibold">PAID</th>
                  <th className="py-3 px-2 text-left font-semibold">DELIVERED</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {orderArray.map((order) => (
                  <tr key={order._id} className="border-b border-tech-blue/5 hover:bg-tech-dark/30 transition-colors">
                    <td className="py-2 px-2">
                      <img
                        src={order.orderItems?.[0]?.image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded-lg border border-tech-blue/10"
                      />
                    </td>
                    <td className="py-2 px-2 font-mono text-xs">{order._id}</td>
                    <td className="py-2 px-2">{order.user ? order.user.username : "N/A"}</td>
                    <td className="py-2 px-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                    <td className="py-2 px-2">${order.totalPrice}</td>
                    <td className="py-2 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid ? "bg-tech-blue/80 text-white" : "bg-tech-dark/60 text-tech-text-secondary border border-tech-blue/20"}`}>
                        {order.isPaid ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? "bg-tech-blue/80 text-white" : "bg-tech-dark/60 text-tech-text-secondary border border-tech-blue/20"}`}>
                        {order.isDelivered ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <Link to={`/order/${order._id}`}>
                        <button className="tech-btn bg-tech-blue hover:bg-tech-dark text-xs px-4 py-2">More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;