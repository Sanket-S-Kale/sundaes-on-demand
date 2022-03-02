import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SummaryForm() {
  const [iAgree, setIAgree] = useState(false);
  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
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
