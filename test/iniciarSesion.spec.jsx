// ...existing code...
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/Pages/IniciarSesion/IniciarSesion.jsx";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock del archivo de usuarios (named export)
vi.mock("../src/Pages/IniciarSesion/iniciarSesion.js", () => ({
  usuariosValidos: [{ email: "test@correo.com", password: "1234" }],
}));

// Mock del Header (default export) — debe retornar un objeto con la clave "default"
vi.mock("../src/Components/Header", () => ({
  default: () => <div data-testid="header" />,
}));

describe("Componente Login (Iniciar Sesión)", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    // @ts-ignore
    window.location = { href: "" };
    vi.clearAllMocks();
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  it("renderiza el título correctamente", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
  });

  it("muestra los campos de email y contraseña", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si las credenciales son incorrectas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "noexiste@correo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "incorrecta" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    expect(screen.getByText("Email o contraseña incorrectos")).toBeInTheDocument();
  });

  it("guarda al usuario en localStorage si las credenciales son correctas", () => {
    const mockSetItem = vi.spyOn(Storage.prototype, "setItem");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "test@correo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    expect(mockSetItem).toHaveBeenCalledWith(
      "usuarioLogueado",
      JSON.stringify({ email: "test@correo.com", password: "1234" })
    );

    mockSetItem.mockRestore();
  });
});
// ...existing code...