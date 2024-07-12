import React, { useEffect, useState } from "react";
import { z } from "zod";
import Viewer from "./Viewer";
import router from "next/router";
import Popup from "reactjs-popup";
const orderValidator = z
  .object({
    sugarLevelId: z.number().positive(),
    iceLevelId: z.number().positive(),
    cupId: z.number().positive(),
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
  cups: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  toppings: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      description: z.string(),
    })
  ),
  flavors: z.array(
    z.object({ id: z.number(), name: z.string(), description: z.string() })
  ),
  teas: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      description: z.string(),
    })
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
    teaId: 1,
    milkId: 1,
    flavorId: 1,
    toppingId: 1,
  });

  const [options, setOptions] = useState<Options | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showButtons1, setShowButtons1] = useState(true);
  const [showButtons2, setShowButtons2] = useState(false);
  const [showButtons3, setShowButtons3] = useState(false);
  const [backButton1, setBackbutton1] = useState(true);
  const [backButton2, setBackbutton2] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage === null) {
      router.push("/");
      return;
    } else {
      setToken(tokenFromStorage);
    }

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

  const random = () => {
    if (options === null) {
      return;
    }
    const storeRandomTea = Math.floor(Math.random() * options.teas.length);
    const storeRandomMilk = Math.floor(Math.random() * options.milk.length);
    const storeRandomFlavor = Math.floor(
      Math.random() * options.flavors.length
    );
    const storeRandomTopping = Math.floor(
      Math.random() * options.toppings.length
    );
    const storeRandomIce = Math.floor(Math.random() * options.iceLevels.length);
    const storeRandomSugar = Math.floor(
      Math.random() * options.sugarLevels.length
    );
    const storeRandomCup = Math.floor(Math.random() * options.cups.length);

    console.log(options.teas[storeRandomTea]);
    setOrder({
      sugarLevelId: options.sugarLevels[storeRandomSugar].id,
      iceLevelId: options.iceLevels[storeRandomIce].id,
      cupId: options.cups[storeRandomCup].id,
      teaId: options.teas[storeRandomTea].id,
      milkId: options.milk[storeRandomMilk].id,
      flavorId: options.flavors[storeRandomFlavor].id,
      toppingId: options.toppings[storeRandomTopping].id,
    });
  };
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
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
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
        <div className="wholeform-div">
          <button className="universe-button" type="button" onClick={random}>
            ✨ Let the Universe decide ✨
          </button>
          {showButtons1 && (
            <div className="tea-milk">
              {/* Teas */}

              <div className="tea-selection">
                <label className="label">Tea choices</label>
                {options.teas.map((tea) => (
                  <div key={tea.id} className="button-row">
                    <button
                      key={tea.id}
                      type="button"
                      className={`boba-button ${
                        order.teaId === tea.id && "active"
                      }`}
                      onClick={() => {
                        setOrder({ ...order, teaId: tea.id });
                      }}
                    >
                      <h4>{tea.name}</h4>
                      <h4> {tea.price} €</h4>
                    </button>
                    <Popup
                      trigger={
                        <button type="button" className="info-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="hotpink"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>
                        </button>
                      }
                      position="right center"
                    >
                      <p className="description"> {tea.description}</p>
                    </Popup>
                  </div>
                ))}
              </div>

              {/* Milk */}
              <div className="milk-selection">
                <label className="label">Milk choices</label>
                {options.milk.map((milk) => (
                  <button
                    key={milk.id}
                    type="button"
                    className={`boba-button ${
                      order.milkId === milk.id && "active"
                    }`}
                    onClick={() => {
                      setOrder({ ...order, milkId: milk.id });
                    }}
                  >
                    <h4>{milk.name}</h4>
                    <h4> {milk.price} €</h4>
                  </button>
                ))}
                <button className="next-button" onClick={showNextButtons}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {showButtons2 && (
          <>
            <div className="tea-milk">
              {/* Flavors */}
              <div className="tea-selection">
                <label className="label">Flavor choices</label>
                {options.flavors.map((flavor) => (
                  <div className="button-row">
                    <button
                      key={flavor.id}
                      type="button"
                      className={`boba-button ${
                        order.flavorId === flavor.id && "active"
                      }`}
                      onClick={() => {
                        setOrder({ ...order, flavorId: flavor.id });
                      }}
                    >
                      <h4>{flavor.name}</h4>
                    </button>
                    <Popup
                      trigger={
                        <button type="button" className="info-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="hotpink"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>
                        </button>
                      }
                      position="right center"
                    >
                      <p className="description"> {flavor.description}</p>
                    </Popup>
                  </div>
                ))}
              </div>

              {/* Toppings */}
              <div className="milk-selection">
                <label className="label">Topping choices</label>
                {options.toppings.map((topping) => (
                  <div className="button-row">
                    <button
                      key={topping.id}
                      type="button"
                      className={`boba-button ${
                        order.toppingId === topping.id && "active"
                      }`}
                      onClick={() => {
                        setOrder({ ...order, toppingId: topping.id });
                      }}
                    >
                      <h4>{topping.name}</h4>
                      <h4>{topping.price} €</h4>
                    </button>
                    <Popup
                      trigger={
                        <button type="button" className="info-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="hotpink"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                          </svg>
                        </button>
                      }
                      position="right center"
                    >
                      <p className="description"> {topping.description}</p>
                    </Popup>
                  </div>
                ))}
              </div>
            </div>
            <div className="next-back">
              <button
                type="button"
                className="back-button"
                onClick={showBackButton}
              >
                Back
              </button>
              <button className="next-button1" onClick={showFinalButtons}>
                Next
              </button>
            </div>
          </>
        )}

        {showButtons3 && (
          <>
            <div className="tea-milk">
              {/* IceLevels */}
              <div className="tea-selection">
                <label className="label">Ice Level</label>
                {options.iceLevels.map((iceLvl) => (
                  <button
                    key={iceLvl.id}
                    type="button"
                    className={`boba-button ${
                      order.iceLevelId === iceLvl.id && "active"
                    }`}
                    onClick={() => {
                      setOrder({ ...order, iceLevelId: iceLvl.id });
                    }}
                  >
                    <h4>{iceLvl.name}</h4>
                  </button>
                ))}
              </div>
              {/* SugarLevels */}
              <div className="tea-selection">
                <label className="label">Sugar Level</label>
                {options.sugarLevels.map((sugarLvl) => (
                  <button
                    key={sugarLvl.id}
                    type="button"
                    className={`boba-button ${
                      order.sugarLevelId === sugarLvl.id && "active"
                    }`}
                    onClick={() => {
                      setOrder({ ...order, sugarLevelId: sugarLvl.id });
                    }}
                  >
                    <h4>{sugarLvl.name}</h4>
                  </button>
                ))}
              </div>
              {/* Cups */}
              <div className="tea-selection">
                <label className="label">Cup choices</label>
                {options.cups.map((cup) => (
                  <button
                    key={cup.id}
                    type="button"
                    className={`boba-button ${
                      order.cupId === cup.id && "active"
                    }`}
                    onClick={() => {
                      setOrder({ ...order, cupId: cup.id });
                    }}
                  >
                    <h4>{cup.name}</h4>
                    <h4>{cup.price} €</h4>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="submit-back">
                <button
                  type="button"
                  className="back-button1"
                  onClick={showBackButton2}
                >
                  Back
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default OrderForm;
