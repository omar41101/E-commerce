import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container min-h-screen flex flex-col md:flex-row items-start justify-center mx-auto bg-gradient-to-br from-tech-black via-tech-dark to-tech-purple/60 animate-float py-10">
      <div className="md:w-2/3 pr-4">
        <div className="tech-card border border-tech-blue/30 shadow-xl mt-5 pb-4 mb-5 backdrop-blur-lg">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="border-b-2 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20">
                  <tr>
                    <th className="p-3 text-left font-bold text-tech-blue uppercase tracking-wider">Image</th>
                    <th className="p-3 text-left font-bold text-tech-blue uppercase tracking-wider">Product</th>
                    <th className="p-3 text-center font-bold text-tech-blue uppercase tracking-wider">Quantity</th>
                    <th className="p-3 text-center font-bold text-tech-blue uppercase tracking-wider">Unit Price</th>
                    <th className="p-3 text-center font-bold text-tech-blue uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="hover:bg-tech-light transition-all">
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-md border border-tech-blue/30"
                        />
                      </td>
                      <td className="p-3">
                        <Link to={`/product/${item.product}`} className="gradient-text font-semibold hover:underline">{item.name}</Link>
                      </td>
                      <td className="p-3 text-center">{item.qty}</td>
                      <td className="p-3 text-center">{item.price}</td>
                      <td className="p-3 text-center">$ {(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <div className="tech-card border border-tech-blue/30 shadow-xl mt-5 pb-4 mb-4 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-2 gradient-text font-display tracking-wide">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong> {order.user.username}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2 mt-12 gradient-text font-display tracking-wide">Order Summary</h2>
        <div className="tech-card border border-tech-blue/30 shadow-xl mb-8 p-6 backdrop-blur-lg">
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>$ {order.itemsPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$ {order.shippingPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>$ {order.taxPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>$ {order.totalPrice}</span>
          </div>
          {!order.isPaid && (
            <div className="mt-6">
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
            </div>
          )}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <div className="mt-6">
              <button
                type="button"
                className="tech-btn w-full text-lg py-3 shadow-lg hover:shadow-pink-500/40 transition-all"
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;