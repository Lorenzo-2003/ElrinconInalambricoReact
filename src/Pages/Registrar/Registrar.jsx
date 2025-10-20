import React, { useState } from 'react';
import './Registrar.css';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar campos requeridos
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
    //validacion del contenido del gmail
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            try {
                // Aquí iría la llamada a tu API
                console.log('Datos del formulario:', formData);
                window.location.href = './';
                
                // Limpiar formulario
                setFormData({
                    nombre: '',
                    apellido: '',
                    email: '',
                    telefono: '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (error) {
                console.error('Error al registrar:', error);
                alert('Error al registrar. Intenta nuevamente.');
            }
        } else {
            setErrors(formErrors);
        }
        
        setIsSubmitting(false);
    };

    return (
    <div className="menu-bg" style={{minHeight: '100vh'}}>
            <div className="registrar-box">
                <h1 className="registrar-title">Crear Cuenta</h1>
                
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
                            className="form-control"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
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
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí </Link>
                </div>
            </div>
        </div>
    );
};

export default Registrar;