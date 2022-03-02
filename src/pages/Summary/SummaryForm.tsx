import React, { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

function SummaryForm() {
  const [iAgree, setIAgree] = useState(false);
  const popover = (
    <Popover id="terms-and-conditions-popover">
      <Popover.Body>No Ice-cream will actually be delivered.</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={iAgree}
          onChange={(event) => setIAgree(event.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!iAgree}>
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
