import React, { FunctionComponent } from "react";
import { Col } from "react-bootstrap";

type ToppingOptionProps = {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, itemCount: string) => void;
};

const ToppingOption: FunctionComponent<ToppingOptionProps> = (props) => {
  const { name, imagePath } = props;
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};

export default ToppingOption;
