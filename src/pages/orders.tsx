import Layout from "@/components/Layout";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Order {
  id: number;
  cup: {
    name: string;
    price: number;
  };
  iceLevel: {
    name: string;
  };
  sugarLevel: {
    name: string;
  };
  size: {
    name: string;
    price: number;
  };
  flavor: {
    name: string;
  };
  tea: {
    name: string;
    price: number;
  };
  milk: {
    name: string;
    price: number;
  };
  topping: {
    name: string;
  };
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const getOrdersFromApi = useCallback(async () => {
    if (token === null) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const itemData = await response.json();
      setOrders(itemData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [token]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage === null) {
      alert("Please log in to view your orders");
      console.log("Login to see your orders");
      router.push("/login");
      return;
    }
    setToken(tokenFromStorage);

    getOrdersFromApi();
  }, [getOrdersFromApi]);

  const removeOrder = async (id: number) => {
    console.log(`Removing order with ID: ${id}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove order");
      }
      // Update state locally after successful deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error removing order:", error);
    }
  };

  const newTotal = (order: Order) => {
    const teaPrice = order.tea?.price || 0;
    const milkPrice = order.milk?.price || 0;
    const cupPrice = order.cup?.price || 0;
    return teaPrice + milkPrice + cupPrice;
  };

  const OrderList = ({ order }: { order: Order }) => {
    const { id, cup, iceLevel, sugarLevel, flavor, tea, milk, topping } = order;

    return (
      <div className="order">
        <h3>Order ID: {id}</h3>

        <h4>Tea</h4>
        <p>{tea.name}</p>
        <p className="price">{tea.price}€</p>

        <h4>Milk</h4>
        <p>{milk.name}</p>

        <h4>Flavor</h4>
        <p>{flavor.name}</p>

        <h4>Ice Level</h4>
        <p>{iceLevel.name}</p>

        <h4>Sugar Level</h4>
        <p>{sugarLevel.name}</p>

        <h4>Cup</h4>
        <p>{cup.name}</p>
        <p className="price">{cup.price}€</p>

        <h4>Topping</h4>
        <p>{topping.name}</p>
        <br />
        <h3>Total price: {newTotal(order)} €</h3>
        <button className="remove-button" onClick={() => removeOrder(id)}>
          Remove
        </button>
      </div>
    );
  };

  if (orders === null) {
    return <p className="loading">loading...</p>;
  }

  return (
    <Layout>
      <div className="orders-container">
        <h2>Welcome to your orders</h2>
        <div>
          {orders.map((order) => (
            <OrderList key={order.id} order={order} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
