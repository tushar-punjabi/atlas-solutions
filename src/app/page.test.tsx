import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the brand", () => {
    render(<Home />);
    expect(screen.getByText(/Atlas/)).toBeDefined();
  });

  it("renders the WhatsApp CTA with the correct number", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /contáctanos/i });
    expect(link.getAttribute("href")).toBe("https://wa.me/56922385213");
  });
});
