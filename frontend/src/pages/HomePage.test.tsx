import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@/test/test-utils";
import { HomePage } from "./HomePage";

// Helper to set viewport size
const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
};

describe("HomePage", () => {
  beforeEach(() => {
    // Reset to default viewport
    setViewport(1024, 768);
  });

  describe("Snapshot Tests", () => {
    it("matches snapshot on mobile (375px)", () => {
      setViewport(375, 667);
      const { container } = render(<HomePage />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot on tablet (768px)", () => {
      setViewport(768, 1024);
      const { container } = render(<HomePage />);
      expect(container).toMatchSnapshot();
    });

    it("matches snapshot on desktop (1280px)", () => {
      setViewport(1280, 720);
      const { container } = render(<HomePage />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Content Tests", () => {
    it("renders the main heading", () => {
      const { getByText } = render(<HomePage />);
      expect(getByText("Splittat")).toBeInTheDocument();
    });

    it("renders the tagline", () => {
      const { getByText } = render(<HomePage />);
      expect(getByText("Receipt splitting made easy")).toBeInTheDocument();
    });

    it("renders login and signup links", () => {
      const { getByText } = render(<HomePage />);
      expect(getByText("Login")).toBeInTheDocument();
      expect(getByText("Sign Up")).toBeInTheDocument();
    });
  });
});
