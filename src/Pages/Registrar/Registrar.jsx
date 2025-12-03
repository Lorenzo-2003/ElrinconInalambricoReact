import React, { useState } from 'react';
import './Registrar.css';
import Header from '../../Components/Header';
import { Link, useNavigate } from 'react-router-dom';

const Registrar = () => {
    const [formData, setFormData] = useState({
        rut: '',
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
        } else if (name === 'rut') {
            // Para RUT: Permitir números, puntos, guión y K/k
            const cleanedValue = value.toUpperCase();
            if (cleanedValue === '' || /^[0-9\.\-Kk]*$/.test(cleanedValue)) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: cleanedValue
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

        // 🔥 VALIDACIÓN DE RUT (NUEVO)
        if (!formData.rut.trim()) {
            newErrors.rut = 'El RUT es requerido';
        } else if (!isValidRUT(formData.rut)) {
            newErrors.rut = 'Ingresa un RUT válido (ej: 12.345.678-9)';
        }

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        } else if (formData.nombre.trim().length < 2) {
            newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        } else if (formData.apellido.trim().length < 2) {
            newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
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
        } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Debe contener al menos una mayúscula y un número';
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

    // 🔥 FUNCIÓN PARA VALIDAR RUT CHILENO (opcional, puedes ajustar)
    const isValidRUT = (rut) => {
        // Limpiar el RUT
        const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
        
        if (cleanRut.length < 8 || cleanRut.length > 10) {
            return false;
        }
        
        // Separar número y dígito verificador
        const rutNumber = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1);
        
        // Validar que el número sea numérico
        if (!/^\d+$/.test(rutNumber)) {
            return false;
        }
        
        // Validar dígito verificador (0-9 o K)
        if (!/^[0-9K]$/.test(dv)) {
            return false;
        }
        
        return true; // Para desarrollo, aceptamos cualquier formato válido
        // Para producción, podrías agregar el algoritmo de validación completo
    };

    // 🔥 FUNCIÓN PARA FORMATEAR RUT AL TYPING
    const formatRUT = (value) => {
        // Remover todo excepto números y K
        const clean = value.replace(/[^0-9Kk]/g, '').toUpperCase();
        
        if (clean.length === 0) return '';
        
        // Formatear: XX.XXX.XXX-X
        let formatted = clean;
        if (clean.length > 1) {
            // Insertar puntos
            let parts = [];
            let numbers = clean.slice(0, -1);
            let dv = clean.slice(-1);
            
            // Insertar puntos cada 3 dígitos desde el final
            for (let i = numbers.length; i > 0; i -= 3) {
                parts.unshift(numbers.slice(Math.max(0, i - 3), i));
            }
            
            formatted = parts.join('.') + '-' + dv;
        }
        
        return formatted;
    };

    const handleRUTChange = (e) => {
        const rawValue = e.target.value;
        const formatted = formatRUT(rawValue);
        
        setFormData(prevState => ({
            ...prevState,
            rut: formatted
        }));
        
        if (errors.rut) {
            setErrors(prevErrors => ({
                ...prevErrors,
                rut: ''
            }));
        }
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
                    // RUT ahora viene del formulario
                    rut: formData.rut.trim(),
                    
                    // Nombre completo (nombre + apellido combinados)
                    nombre: `${formData.nombre.trim()} ${formData.apellido.trim()}`,
                    
                    // email → correo
                    correo: formData.email.trim(),
                    
                    // password → contrasena
                    contrasena: formData.password,
                    
                    // Teléfono como número (0 si está vacío)
                    telefono: formData.telefono ? parseInt(formData.telefono) : 0,
                    
                    // Rol (obligatorio en backend)
                    rol: {
                        id: 2  // ID para rol "cliente"
                    }
                };

                console.log('📤 Enviando a backend:', usuarioBackend);
                console.log('🔗 URL: http://localhost:8081/usuario');

                const response = await fetch('http://localhost:8081/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuarioBackend),
                });

                console.log('📥 Respuesta del servidor:', response.status);

                if (response.ok) {
                    try {
                        const usuarioCreado = await response.json();
                        console.log('✅ Usuario registrado exitosamente:', usuarioCreado);
                        
                        alert(`¡Bienvenido ${formData.nombre}! Tu cuenta ha sido creada exitosamente.`);
                        
                        // Limpiar formulario
                        setFormData({
                            rut: '',
                            nombre: '',
                            apellido: '',
                            email: '',
                            telefono: '',
                            password: '',
                            confirmPassword: ''
                        });
                        
                        // Redirigir a login después de 2 segundos
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                        
                    } catch (jsonError) {
                        console.error('❌ Error parseando JSON:', jsonError);
                        alert('✅ Registro exitoso (respuesta no JSON)');
                        setTimeout(() => navigate('/login'), 2000);
                    }
                    
                } else {
                    const errorText = await response.text();
                    console.error('❌ Error del backend:', response.status, errorText);
                    
                    if (errorText.includes('Data too long for column') || errorText.includes('truncation')) {
                        setBackendError('Error: El RUT es demasiado largo. Máximo 12 caracteres.');
                    } else if (response.status === 409) {
                        setBackendError('El correo electrónico ya está registrado');
                    } else if (response.status === 400) {
                        setBackendError('Datos inválidos. Verifica la información ingresada.');
                    } else if (response.status === 500 && errorText.includes('rut')) {
                        setBackendError('Error con el RUT. Verifica el formato (ej: 12.345.678-9)');
                    } else {
                        setBackendError(`Error del servidor (${response.status}): ${errorText}`);
                    }
                }
                
            } catch (error) {
                console.error('❌ Error de conexión:', error);
                setBackendError('No se pudo conectar con el servidor.');
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
                
                {backendError && (
                    <div className="alert alert-danger" style={{
                        marginBottom: '20px',
                        padding: '10px 15px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        whiteSpace: 'pre-line'
                    }}>
                        ⚠️ {backendError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} id="registerForm">
                    {/* 🔥 NUEVO CAMPO: RUT */}
                    <div className="form-group">
                        <label htmlFor="rut">RUT</label>
                        <input
                            type="text"
                            id="rut"
                            name="rut"
                            className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                            value={formData.rut}
                            onChange={handleRUTChange}
                            placeholder="Ej: 12.345.678-9"
                            required
                        />
                        {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                        <div className="rut-requirements" style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>
                            Formato: 12.345.678-9 (con puntos y guión)
                        </div>
                    </div>
                    
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
                                placeholder="Ej: Juan"
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
                                placeholder="Ej: Pérez"
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
                            placeholder="ejemplo@correo.com"
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
                        <div className="password-requirements">
                            La contraseña debe tener al menos 8 caracteres, una mayúscula y un número
                        </div>
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
                        style={{
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Registrando...
                            </>
                        ) : 'Registrarse'}
                    </button>
                </form>
                
                <div className="registrar-links">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </div>
                
                {/* 🔥 Para debugging */}
                <details style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '5px',
                    fontSize: '12px',
                    color: '#666'
                }}>
                    <summary>Debug: Ver datos que se enviarán al backend</summary>
                    <pre style={{whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '11px'}}>
                        {JSON.stringify({
                            rut: formData.rut,
                            nombre: `${formData.nombre} ${formData.apellido}`,
                            correo: formData.email,
                            contrasena: '[PROTEGIDO]',
                            telefono: formData.telefono || '0',
                            rol: { id: 2 }
                        }, null, 2)}
                    </pre>
                    <div style={{marginTop: '10px', fontSize: '11px'}}>
                        <strong>Endpoint:</strong> http://localhost:8081/usuario
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Registrar;