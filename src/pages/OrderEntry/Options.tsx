import React, { FunctionComponent, useEffect, useState } from "react";
import ScoopOption from "./ScoopOption/ScoopOption";
import Row from 'react-bootstrap/Row';
import axios from "axios";
import ToppingOption from "./ToppingOption/ToppingOption";

type OptionsEntryProps = {
  type: string;
};

type EntryProps = {
  name: string;
  imagePath: string;
};

const OptionsEntry: FunctionComponent<OptionsEntryProps> = (props) => {
  const { type } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${type}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle errors
      });
  }, [type]);

  const ItemComponent = type === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item: EntryProps) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default OptionsEntry;
