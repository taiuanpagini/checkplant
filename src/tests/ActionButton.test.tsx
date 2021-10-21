import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ActionButton from '../components/ActionButton';

describe('ActionButton Component', () => {
  it('Render component', () => {
    const action = jest.fn();
    const { container } = render(
      <ActionButton
        title="Sim"
        background="#D20200"
        border="#D20200"
        color="#ffffff"
        action={action}
      />
    );

    expect(container).not.toBeNull();
  });

  it('Click button action', () => {
    const action = jest.fn();
    render(
      <ActionButton
        title="Sim"
        background="#D20200"
        border="#D20200"
        color="#ffffff"
        action={action}
      />
    );

    const clickButton = screen.getByTitle('Sim');

    fireEvent.click(clickButton);
    expect(action).toHaveBeenCalledTimes(1);
  });
});