import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

//@ts-ignore
const OrderDetails = createContext();

export type OptionCountsType = {
    scoops: Map<string, number>,
    toppings: Map<string, number>,
};

//create custom hook to heck whether we're inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

const calculateSubTotal = (
  optionType: string,
  optionCounts: OptionCountsType
): number => {
  let optionCount = 0;
  const map = optionCounts[optionType as keyof OptionCountsType];
  for (const count of Array.from(map.values())) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType as keyof typeof pricePerItem];
};

export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubTotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubTotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  // value returns a getter and a setter
  const value = useMemo(() => {
    const updateItemCount = (
      itemName: string,
      newItemCount: string,
      optionType: string
    ) => {
      let newOptionCounts = { ...optionCounts };

      //update option count for this item with the new value
      const optionCountsMap =
        newOptionCounts[optionType as keyof OptionCountsType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    // getters: object containing option counts for scoops and toppings, subtotals and totals
    // setters: usdateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
