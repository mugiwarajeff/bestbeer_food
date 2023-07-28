import { render } from "@testing-library/react";
import Desks from "./Desks";

test("Should present a section in component", () => {

  const container = render( <Desks/> )

  
  expect(container);
}); 