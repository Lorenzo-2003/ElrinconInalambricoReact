document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Las contraseñas no coinciden');
                isValid = false;
            } else {
                removeError('confirmPassword');
            }
            
            // Validar longitud de contraseña
            if (password.length < 8) {
                showError('password', 'La contraseña debe tener al menos 8 caracteres');
                isValid = false;
            } else {
                removeError('password');
            }
            
            // Validar campos requeridos
            const requiredFields = ['nombre', 'apellido', 'email'];
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    showError(field, 'Este campo es requerido');
                    isValid = false;
                } else {
                    removeError(field);
                }
            });
            
            if (isValid) {
                // Aquí normalmente enviarías los datos al servidor
                console.log('Formulario válido, enviando datos...');
                alert('¡Registro exitoso!');
                
                // Limpiar el formulario
                this.reset();
            }
        });
        
        // Validación en tiempo real
        const inputs = registerForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    removeError(this.id);
                }
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch (fieldId) {
            case 'nombre':
            case 'apellido':
                if (!value) {
                    showError(fieldId, 'Este campo es requerido');
                } else {
                    removeError(fieldId);
                }
                break;
                
            case 'email':
                if (!value) {
                    showError(fieldId, 'El correo electrónico es requerido');
                } else if (!isValidEmail(value)) {
                    showError(fieldId, 'Ingresa un correo electrónico válido');
                } else {
                    removeError(fieldId);
                }
                break;
                
            case 'password':
                if (!value) {
                    showError(fieldId, 'La contraseña es requerida');
                } else if (value.length < 8) {
                    showError(fieldId, 'La contraseña debe tener al menos 8 caracteres');
                } else {
                    removeError(fieldId);
                }
                break;
                
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (!value) {
                    showError(fieldId, 'Confirma tu contraseña');
                } else if (value !== password) {
                    showError(fieldId, 'Las contraseñas no coinciden');
                } else {
                    removeError(fieldId);
                }
                break;
        }
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-invalid');
        
        // Remover mensaje de error anterior
        removeError(fieldId);
        
        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        errorDiv.id = `error-${fieldId}`;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeError(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.remove('is-invalid');
        
        const existingError = document.getElementById(`error-${fieldId}`);
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});