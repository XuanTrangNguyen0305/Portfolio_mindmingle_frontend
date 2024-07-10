import React, { useEffect, useState } from "react";
import { z } from "zod";
import Viewer from "./Viewer";
import router from "next/router";

const orderValidator = z
  .object({
    sugarLevelId: z.number().positive(),
    iceLevelId: z.number().positive(),
    cupId: z.number().positive(),
    sizeId: z.number().positive(),
    teaId: z.number().positive(),
    milkId: z.number().positive(),
    flavorId: z.number().positive(),
    toppingId: z.number().positive(),
  })
  .strict();

export type Order = z.infer<typeof orderValidator>;

const OptionValidator = z.object({
  iceLevels: z.array(z.object({ id: z.number(), name: z.string() })),
  sugarLevels: z.array(z.object({ id: z.number(), name: z.string() })),
  sizes: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  cups: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  toppings: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  flavors: z.array(z.object({ id: z.number(), name: z.string() })),
  teas: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  milk: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
});
export type Options = z.infer<typeof OptionValidator>;

const OrderForm = () => {
  const [order, setOrder] = useState<Order>({
    sugarLevelId: 1,
    iceLevelId: 1,
    cupId: 1,
    sizeId: 1,
    teaId: 1,
    milkId: 1,
    flavorId: 1,
    toppingId: 1,
  });

  const [ClickedTeaId, setClickedTeaId] = useState<number | null>(null);
  const [ClickedMilkId, setClickedMilkId] = useState<number | null>(null);
  const [ClickedFlavorId, setClickedFlavorId] = useState<number | null>(null);
  const [ClickedToppingId, setClickedToppingId] = useState<number | null>(null);
  const [ClickedIceId, setClickedIceId] = useState<number | null>(null);
  const [ClickedSugarId, setClickedSugarId] = useState<number | null>(null);
  const [ClickedCupId, setClickedCupId] = useState<number | null>(null);
  const [options, setOptions] = useState<Options | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showButtons1, setShowButtons1] = useState(true);
  const [showButtons2, setShowButtons2] = useState(false);
  const [showButtons3, setShowButtons3] = useState(false);
  const [backButton1, setBackbutton1] = useState(true);
  const [backButton2, setBackbutton2] = useState(true);
  // const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getOptionsfromAPI = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/options`
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        const validated = OptionValidator.safeParse(data);

        if (validated.success) {
          setOptions(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.error("Fetch error for options:", error);
      }
    };
    getOptionsfromAPI();
  }, []);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage === null) {
      router.push("/");
    } else {
      setToken(tokenFromStorage);
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validated = orderValidator.safeParse(order);
      if (!validated.success) {
        console.log(validated.error.flatten());
        return;
      }

      console.log(event.currentTarget);
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);

      console.log("Data", data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(validated.data),
        }
      );
      const json = await response.json();
      console.log(json);
      router.push("/orders");

      if (response.ok) {
        console.log("Order submitted successfully");
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const showNextButtons = () => {
    setShowButtons1(false);
    setShowButtons2(true);
  };

  const showBackButton = () => {
    setShowButtons1(true);
    setBackbutton1(false);
    setShowButtons2(false);
  };

  const showFinalButtons = () => {
    setShowButtons2(false);
    setShowButtons3(true);
  };

  const showBackButton2 = () => {
    setShowButtons2(true);
    setBackbutton2(false);
    setShowButtons3(false);
  };

  if (!options) {
    return <p>Loading...</p>;
  }

  return (
    <main className="editor">
      <div className="order-viewer">
        <Viewer order={order} />
      </div>
      <form className="order-form" onSubmit={handleFormSubmit}>
        <div className="tea-milk-button">
          {showButtons1 && (
            <>
              {/* Teas */}
              <label className="label">Tea choices</label>
              {options.teas.map((tea) => (
                <button
                  key={tea.id}
                  type="button"
                  className="button"
                  style={{
                    backgroundColor:
                      ClickedTeaId === tea.id ? "#ffde71" : "#8c7dd3",
                    color: "white",
                  }}
                  onClick={() => {
                    setOrder({ ...order, teaId: tea.id });
                    setClickedTeaId(tea.id);
                  }}
                >
                  <h4>{tea.name}</h4>
                  <h4> {tea.price} €</h4>
                </button>
              ))}

              {/* Milk */}
              <label className="label">Milk choices</label>
              {options.milk.map((milk) => (
                <button
                  key={milk.id}
                  type="button"
                  className="button"
                  style={{
                    backgroundColor:
                      ClickedMilkId === milk.id ? "#ffde71" : "#8c7dd3",
                    color: "white",
                  }}
                  onClick={() => {
                    setOrder({ ...order, milkId: milk.id });
                    setClickedMilkId(milk.id);
                  }}
                >
                  <h4>{milk.name}</h4>
                  <h4> {milk.price} €</h4>
                </button>
              ))}
              <button className="next-button" onClick={showNextButtons}>
                Next
              </button>
            </>
          )}
        </div>
        {showButtons2 && (
          <>
            {/* Flavors */}
            <label className="label">Flavor choices</label>
            {options.flavors.map((flavor) => (
              <button
                key={flavor.id}
                type="button"
                className="button"
                style={{
                  backgroundColor:
                    ClickedFlavorId === flavor.id ? "#ffde71" : "#8c7dd3",
                  color: "white",
                }}
                onClick={() => {
                  setOrder({ ...order, flavorId: flavor.id });
                  setClickedFlavorId(flavor.id);
                }}
              >
                <h4>{flavor.name}</h4>
              </button>
            ))}

            {/* Toppings */}
            <label className="label">Topping choices</label>
            {options.toppings.map((topping) => (
              <button
                key={topping.id}
                type="button"
                className="button"
                style={{
                  backgroundColor:
                    ClickedToppingId === topping.id ? "#ffde71" : "#8c7dd3",
                  color: "white",
                }}
                onClick={() => {
                  setOrder({ ...order, toppingId: topping.id });
                  setClickedToppingId(topping.id);
                }}
              >
                <h4>{topping.name}</h4>
              </button>
            ))}
            <button className="next-button" onClick={showFinalButtons}>
              Next
            </button>

            <button
              type="button"
              className="back-button"
              onClick={showBackButton}
            >
              Back
            </button>
          </>
        )}

        {showButtons3 && (
          <>
            {/* IceLevels */}
            <label className="label">Ice Level</label>
            {options.iceLevels.map((iceLvl) => (
              <button
                key={iceLvl.id}
                type="button"
                className="button"
                style={{
                  backgroundColor:
                    ClickedIceId === iceLvl.id ? "#ffde71" : "#8c7dd3",
                  color: "white",
                }}
                onClick={() => {
                  setOrder({ ...order, iceLevelId: iceLvl.id });
                  setClickedIceId(iceLvl.id);
                }}
              >
                <h4>{iceLvl.name}</h4>
              </button>
            ))}

            {/* SugarLevels */}
            <label className="label">Sugar Level</label>
            {options.sugarLevels.map((sugarLvl) => (
              <button
                key={sugarLvl.id}
                type="button"
                className="button"
                style={{
                  backgroundColor:
                    ClickedSugarId === sugarLvl.id ? "#ffde71" : "#8c7dd3",
                  color: "white",
                }}
                onClick={() => {
                  setOrder({ ...order, sugarLevelId: sugarLvl.id });
                  setClickedSugarId(sugarLvl.id);
                }}
              >
                <h4>{sugarLvl.name}</h4>
              </button>
            ))}

            {/* Cups */}
            <label className="label">Cup choices</label>
            {options.cups.map((cup) => (
              <button
                key={cup.id}
                type="button"
                className="button"
                style={{
                  backgroundColor:
                    ClickedCupId === cup.id ? "#ffde71" : "#8c7dd3",
                  color: "white",
                }}
                onClick={() => {
                  setOrder({ ...order, cupId: cup.id });
                  setClickedCupId(cup.id);
                }}
              >
                <h4>{cup.name}</h4>
                <h4>{cup.price} €</h4>
              </button>
            ))}
            <button type="submit">Submit</button>
            <button
              type="button"
              className="back-button"
              onClick={showBackButton2}
            >
              Back
            </button>
          </>
        )}
        {/* </div>
        </div> */}
      </form>
    </main>
  );
};

export default OrderForm;
