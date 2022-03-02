import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  userEvent.click(iAgreeCheckbox);
  expect(confirmOrderButton).toBeEnabled();

  userEvent.click(iAgreeCheckbox);
  expect(confirmOrderButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice-cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice-cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice-cream will actually be delivered/i)
  );
});
