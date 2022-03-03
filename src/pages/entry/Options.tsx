import React, { FunctionComponent, useEffect, useState } from "react";
import ScoopOption from "./scoopOption/ScoopOption";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ToppingOption from "./toppingOption/ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

type OptionsProps = {
  type: string;
};

type EntryProps = {
  name: string;
  imagePath: string;
};

const Options: FunctionComponent<OptionsProps> = (props) => {
  const { type } = props;
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${type}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [type]);

  const ItemComponent = type === "scoops" ? ScoopOption : ToppingOption;
  const title = type[0].toUpperCase() + type.slice(1).toLowerCase();

  const optionItems = items.map((item: EntryProps) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, itemCount) => updateItemCount(itemName, itemCount, type)}
    />
  ));

  return error ? (
    <AlertBanner />
  ) : (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[type as keyof (typeof pricePerItem)]} each</p>
      <p>{title} total: {orderDetails.totals[type]}</p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
