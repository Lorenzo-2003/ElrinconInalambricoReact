export const usuariosValidos = [
  { 
    id: 1, 
    email: "Mar@gmail.com", 
    password: "Jok20",
    nombre: "Marcelo",
    rol: "cliente"
  },
  { 
    id: 2, 
    email: "admin@test.com", 
    password: "admin123",
    nombre: "Administrador",
    rol: "admin"
  },
  { 
    id: 3, 
    email: "lorenzo@test.com", 
    password: "password",
    nombre: "Lorenzo",
    rol: "cliente"
  }
];

export function validarLogin(email, password) {
  return usuariosValidos.find(
    user => user.email === email && user.password === password
  );
}