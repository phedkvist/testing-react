import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./Input";

describe("Input", () => {
  it("should handle updates to input field", () => {
    const setValue = jest.fn();
    const screen = render(
      <InputField name="search" type="search" value={""} setValue={setValue} />
    );

    userEvent.type(screen.getByLabelText("search"), "Hey there");
    waitFor(() => {
      expect(setValue).toHaveBeenCalledWith("Hey there");
    });
  });

  it("should render value", () => {
    const setValue = jest.fn();
    const screen = render(
      <InputField
        name="search"
        type="search"
        value={"Hey there"}
        setValue={setValue}
      />
    );

    const input = screen.getByLabelText("search");
    expect(input.getAttribute("value")).toEqual("Hey there");
  });
});
