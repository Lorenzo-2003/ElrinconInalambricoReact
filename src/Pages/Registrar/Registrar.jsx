import React, { useState } from 'react';
import './Registrar.css';
import Header from '../../Components/Header';
import { Link, useNavigate } from 'react-router-dom';

const Registrar = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [backendError, setBackendError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'telefono') {
            // Solo permitir números
            if (value === '' || /^\d*$/.test(value)) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
        
        // Limpiar error de backend cuando usuario escribe
        if (backendError) setBackendError('');
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        // Teléfono es opcional, pero si lo llena debe ser numérico
        if (formData.telefono.trim() !== '') {
            if (!/^\d+$/.test(formData.telefono)) {
                newErrors.telefono = 'El teléfono solo puede contener números';
            } else if (formData.telefono.length < 8) {
                newErrors.telefono = 'El teléfono debe tener al menos 8 dígitos';
            }
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return newErrors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setBackendError('');

        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            try {
                // 🔥 MAPEO DE DATOS: Frontend → Backend
                const usuarioBackend = {
                    // Tu backend NO tiene "apellido", combinamos nombre + apellido
                    nombre: `${formData.nombre} ${formData.apellido}`.trim(),
                    
                    // Tu backend usa "correo", no "email"
                    correo: formData.email,
                    
                    // Tu backend usa "contrasena", no "password"
                    contrasena: formData.password,
                    
                    // Teléfono: convertir string a número (o null si está vacío)
                    telefono: formData.telefono ? parseInt(formData.telefono) : 0,
                    
                    // RUT: Tu backend lo requiere pero frontend no lo pide
                    // Podemos generar uno temporal o hacerlo opcional
                    // OPCION 1: Dejar vacío (si tu BD lo permite)
                    // OPCION 2: Generar uno temporal
                    rut: `temp-${Date.now()}`, // Temporal, luego el usuario deberá actualizar
                    
                    // Rol: Por defecto asignamos rol "cliente" (necesitas el ID del rol)
                    // Esto depende de cómo tengas los roles en tu BD
                    rol: {
                        id: 2, // Asumiendo que ID 2 = "cliente", ID 1 = "admin"
                        nombre: "cliente"
                    }
                };

                console.log('Enviando a backend:', usuarioBackend);

                // 🔥 CONEXIÓN AL BACKEND SPRING BOOT
                const response = await fetch('http://localhost:8081/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuarioBackend),
                });

                if (response.ok) {
                    const usuarioCreado = await response.json();
                    console.log('Usuario registrado en backend:', usuarioCreado);
                    
                    alert(`¡Usuario ${usuarioCreado.nombre} registrado exitosamente!`);
                    
                    // Limpiar formulario
                    setFormData({
                        nombre: '',
                        apellido: '',
                        email: '',
                        telefono: '',
                        password: '',
                        confirmPassword: ''
                    });
                    
                    // Redirigir a login
                    navigate('/login');
                    
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    setBackendError(errorData.message || 'Error en los datos enviados');
                } else if (response.status === 409) {
                    setBackendError('El correo electrónico ya está registrado');
                } else {
                    setBackendError('Error en el servidor. Intenta nuevamente.');
                }
                
            } catch (error) {
                console.error('Error de conexión:', error);
                setBackendError('Error de conexión con el servidor. Verifica que el backend esté corriendo.');
            }
        } else {
            setErrors(formErrors);
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="menu-bg" style={{minHeight: '100vh'}}>
            <Header/>
            
            <div className="registrar-box">
                <h1 className="registrar-title">Crear Cuenta</h1>
                
                {/* 🔥 Mostrar error del backend */}
                {backendError && (
                    <div className="alert alert-danger" style={{marginBottom: '20px'}}>
                        {backendError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} id="registerForm">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                            {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono <span className="optional">(opcional)</span></label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ej: 912345678"
                        />
                        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        <div className="password-requirements">La contraseña debe tener al menos 8 caracteres</div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn-registrar"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                
                <div className="registrar-links">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>
                
                {/* 🔥 Información para desarrollo */}
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '5px',
                    fontSize: '11px',
                    color: '#666',
                    textAlign: 'left'
                }}>
                    <p><strong>Información técnica:</strong></p>
                    <p><strong>Backend URL:</strong> http://localhost:8080/usuario</p>
                    <p><strong>Campo "nombre" en backend:</strong> "{formData.nombre} {formData.apellido}"</p>
                    <p><strong>Campo "correo" en backend:</strong> {formData.email}</p>
                    <p><strong>Campo "telefono" en backend:</strong> {formData.telefono || '0'}</p>
                </div>
            </div>
        </div>
    );
};

export default Registrar;