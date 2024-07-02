import { useEffect, useState } from "react";
import { z } from "zod";
import Viewer from "./Viewer";
import Router from "next/router";

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
type Options = z.infer<typeof OptionValidator>;

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

  const [options, setOptions] = useState<Options>();
  useEffect(() => {
    const getOptionsfromAPI = async () => {
      try {
        const response = await fetch("http://localhost:3001/options");
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validated = orderValidator.safeParse(order);
      if (!validated.success) {
        console.log(validated.error.flatten);
        return;
      }
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated.data),
      });

      if (response.ok) {
        console.log("Order submitted successfully");
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (!options) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    Router.push("/orders");
  };
  return (
    <main className="editor">
      <div className="order-viewer">
        <Viewer order={order} />
      </div>
      <form className="order-form" onSubmit={handleFormSubmit}>
        <div className="option-block">
          <div className="option-choices">
            {/* Teas */}
            <label>Tea choices</label>

            {options.teas.map((tea) => {
              return (
                <button
                  className="tea-button"
                  onClick={() => {
                    setOrder({ ...order, teaId: tea.id });
                  }}
                >
                  {tea.name}
                </button>
              );
            })}

            {/* Milk */}
            <label>Milk choices</label>

            {options.milk.map((milk) => {
              return (
                <button
                  className="milk-button"
                  onClick={() => {
                    setOrder({ ...order, milkId: milk.id });
                  }}
                >
                  {milk.name}
                </button>
              );
            })}

            {/* Flavors */}
            <label>Flavor choices</label>

            {options.flavors.map((flavor) => {
              return (
                <button
                  className="flavor-button"
                  onClick={() => {
                    setOrder({ ...order, flavorId: flavor.id });
                  }}
                >
                  {flavor.name}
                </button>
              );
            })}

            {/* Toppings */}
            <label>Topping choices</label>

            {options.toppings.map((topping) => {
              return (
                <button
                  className="topping-button"
                  onClick={() => {
                    setOrder({ ...order, toppingId: topping.id });
                  }}
                >
                  {topping.name}
                </button>
              );
            })}

            {/* IceLevels */}
            <label>Ice Level</label>
            {options.iceLevels.map((iceLvl) => {
              return (
                <button
                  className="ice-button"
                  onClick={() => {
                    setOrder({ ...order, iceLevelId: iceLvl.id });
                  }}
                >
                  {iceLvl.name}
                </button>
              );
            })}

            {/* SugarLevels */}
            <label>Sugar Level</label>

            {options.sugarLevels.map((sugarLvl) => {
              return (
                <button
                  className="sugar-button"
                  onClick={() => {
                    setOrder({ ...order, sugarLevelId: sugarLvl.id });
                  }}
                >
                  {sugarLvl.name}
                </button>
              );
            })}

            {/* Cups */}
            <label>Cup choices</label>

            {options.cups.map((cup) => {
              return (
                <button
                  className="cup-button"
                  onClick={() => {
                    setOrder({ ...order, cupId: cup.id });
                  }}
                >
                  {cup.name}
                </button>
              );
            })}
          </div>
          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};
export default OrderForm;
