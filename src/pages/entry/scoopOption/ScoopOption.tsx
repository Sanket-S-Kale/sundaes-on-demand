import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";

import { Row, Col } from "react-bootstrap";

type ScoopOptionProps = {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, itemCount: string) => void;
};

const ScoopOption: FunctionComponent<ScoopOptionProps> = (props) => {
  const { name, imagePath, updateItemCount } = props;
  const handleChange = (event: any) => {
    updateItemCount(name, event.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        as={Row}
        style={{ marginTop: "10px" }}
        controlId={`${name}-count`}
      >
        <Form.Label column xs={6} style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={(event) => handleChange(event)}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
