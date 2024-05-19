import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderWrapper = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};
