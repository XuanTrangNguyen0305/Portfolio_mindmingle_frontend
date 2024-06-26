import Layout from "@/componnents/Layout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface MenuItem {
  id: number;
  name: string;
  imgURL: string;
}

const MenuItem = (props: MenuItem) => {
  return (
    <div>
      <ul>
        <li>
          <p>{props.id}</p>
          <p>{props.name}</p>
          <img src={props.imgURL} alt={props.name} />
          <br />
          <button> Select </button>
        </li>
      </ul>
    </div>
  );
};

const MenuItemPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/menu-items`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Fetch menu items unsuccessful:", error);
        // Optionally, handle error state or display an error message
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            imgURL={item.imgURL}
          />
        ))}
      </ul>
    </div>
  );
};

export default MenuItemPage;
