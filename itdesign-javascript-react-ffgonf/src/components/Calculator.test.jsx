/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Calculator } from "./Calculator";

test("should render layout with Layout component and one Paragraph component", async () => {
  render(<Calculator />);

  expect(screen.getByTestId("results")).toBeInTheDocument();
});

test("should return right result for addition", async function () {
  render(<Calculator />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "1.28 + 2.89");
  await userEvent.click(screen.getByText("Submit"));

  const paragraph = screen.getByTestId("results");
  expect(paragraph).toHaveTextContent("1.28 + 2.89 = 4.17");
});

test('should render "Wrong input!" in paragraph when wrong input given', async function () {
  render(<Calculator />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "string");
  await userEvent.click(screen.getByText("Submit"));

  const paragraph = screen.getByTestId("results");
  expect(paragraph).toHaveTextContent("Wrong input!");
});
