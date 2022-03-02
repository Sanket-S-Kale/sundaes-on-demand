import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("test initial conditions", () => {
  render(<SummaryForm />);

  const iAgreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  expect(iAgreeCheckbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();
});

test("checking the I agree checkbox enables the button and unchecking it again disables it", () => {
  render(<SummaryForm />);

  const iAgreeCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  fireEvent.click(iAgreeCheckbox);
  expect(confirmOrderButton).toBeEnabled();

  fireEvent.click(iAgreeCheckbox);
  expect(confirmOrderButton).toBeDisabled();
});
