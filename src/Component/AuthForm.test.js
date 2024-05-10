import {  render, render as rtlRender, screen } from "@testing-library/react";
import store from "../store";
import { Provider } from "react-redux";
import AuthForm from "./AuthForm";

test('renders MyComponent and clicks button', () => {
    // Render the component with the Redux store provider
    const { getByText } = render(
      <Provider store={store}>
        <AuthForm></AuthForm>
      </Provider>
    );

    const textElement = getByText(/Your Email/i);
    expect(textElement).toBeInTheDocument();

}
)

