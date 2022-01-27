import { fireEvent, screen, waitFor } from "@testing-library/react";
import HeroButton from "components/HeroButton";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "__tests__/test-utils";

const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ text: (global as any).GREETING }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MainButton", () => {
  it("should have a static call to action", () => {
    render(<HeroButton url="/greeting"></HeroButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Load Greetings");
  });

  // how to pass this?
  // it("should not render greeting message without click", () => {
  //   render(<HeroButton url="/greeting"></HeroButton>);
  //   expect(screen.getByRole("heading")).toThrowError();
  // });

  it("should  load and display greeting", async () => {
    //Render the button first
    // onClicking the button it should trigger an api call
    // After api call is done, the button should display the greeting sent by the api
    render(<HeroButton url="/greeting"></HeroButton>);

    fireEvent.click(screen.getByText("Load Greetings"));

    await waitFor(() => screen.getByRole("heading"));

    expect(screen.getByRole("heading")).toHaveTextContent(
      (global as any).GREETING
    );
  });

  it("should handle server error", async () => {
    server.use(
      rest.get("/greeting", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<HeroButton url="/greeting"></HeroButton>);

    fireEvent.click(screen.getByText("Load Greetings"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "oops! Failed to catch the error"
    );
  });
});
