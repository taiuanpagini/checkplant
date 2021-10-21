import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { Header } from '../components/Header';

describe('Header Component', () => {
  it('Render component', () => {
    const { container } = render(
      <Header />
    );

    expect(container).not.toBeNull();
  });

  it('Get title page', () => {
    render(
      <Header />
    );

    const title = screen.getByText('Gestão de pontos no mapa');
    expect(title).toBeInTheDocument;
  });
});