export default function Registrar() {
  return (
    <div className="registrar-container">
      {/* MENSAJE DE PRUEBA */}
      <div style={{
        background: 'linear-gradient(45deg, #00ff00, #00ffff)',
        color: 'black',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        border: '3px solid red'
      }}>
        🎉 COMPONENTE REGISTRAR FUNCIONANDO 🎉
      </div>

      <div className="registrar-box">
        <h2>Crear Cuenta</h2>
        {/* Aquí va tu formulario de registro */}
      </div>
    </div>
  );
}