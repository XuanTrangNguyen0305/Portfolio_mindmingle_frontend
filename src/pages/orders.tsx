import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const getOrdersFromApi = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetch data:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getOrdersFromApi();
  }, []);

  const OrderList = ({ order }: { order: Order }) => {
    const { id, cup, iceLevel, sugarLevel, size, flavor, tea, milk, topping } =
      order;

    return (
      <div>
        <h3>Order ID: {id}</h3>

        <h4>Tea</h4>
        <p>{tea.name}</p>
        <p>{tea.price}€</p>

        <h4>Milk</h4>
        <p>{milk.name}</p>

        <h4>Flavor</h4>
        <p>{flavor.name}</p>

        <h4>Ice Level</h4>
        <p>{iceLevel.name}</p>

        <h4>Sugar Level</h4>
        <p>{sugarLevel.name}</p>

        <h4>Size</h4>
        <p>{size.name}</p>
        <p>{size.price}€</p>

        <h4>Cup</h4>
        <p>{cup.name}</p>
        <p>{cup.price}€</p>

        <h4>Topping</h4>
        <p>{topping.name}</p>
        <br />
      </div>
    );
  };

  return (
    <Layout>
      <h2>Welcome to your orders</h2>

      <div>
        {orders
          .sort((a, b) => {
            if (a.id.valueOf() < b.id.valueOf()) return 1;
            if (a.id.valueOf() > b.id.valueOf()) return -1;
            return 0;
          })
          .map((order) => (
            <OrderList key={order.id} order={order} />
          ))}
      </div>
    </Layout>
  );
};

export default OrderPage;
