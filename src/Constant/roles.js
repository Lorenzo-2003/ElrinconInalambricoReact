// src/constants/roles.js

/**
 * Utilidades para manejo de roles
 * 
 * IMPORTANTE: El backend devuelve:
 * 1. rol como STRING: "admin" o "Usuario" (con U mayúscula)
 * 2. Los IDs en BD son: 1=admin, 4=Usuario
 */

// Normalizar nombre de rol (para manejar mayúsculas/minúsculas)
const normalizeRoleName = (roleName) => {
  if (!roleName) return 'usuario';
  
  const roleLower = roleName.toString().toLowerCase();
  
  if (roleLower.includes('admin')) {
    return 'admin';
  }
  
  return 'usuario';
};

// Función para obtener nombre de rol (compatible con ambos: ID o string)
export const getRoleName = (roleInput) => {
  if (!roleInput) return 'usuario';
  
  // Si es número (ID)
  if (typeof roleInput === 'number') {
    const roleMap = { 1: 'admin', 4: 'usuario' };
    return roleMap[roleInput] || 'usuario';
  }
  
  // Si es string
  if (typeof roleInput === 'string') {
    return normalizeRoleName(roleInput);
  }
  
  // Si es objeto (ej: {id: 1, nombre: 'admin'})
  if (typeof roleInput === 'object') {
    if (roleInput.nombre) {
      return normalizeRoleName(roleInput.nombre);
    }
    if (roleInput.id) {
      const roleMap = { 1: 'admin', 4: 'usuario' };
      return roleMap[roleInput.id] || 'usuario';
    }
  }
  
  return 'usuario'; // Default
};

// Función para obtener ID de rol
export const getRoleId = (roleName) => {
  if (!roleName) return 4;
  
  const normalized = getRoleName(roleName);
  const roleIdMap = { 'admin': 1, 'usuario': 4 };
  return roleIdMap[normalized] || 4;
};

// Determinar rol basado en email (para registro en frontend)
export const getRoleFromEmail = (email) => {
  if (!email) return { id: 4, name: 'usuario' };
  
  const emailLower = email.toLowerCase();
  
  // Es admin si:
  const isAdmin = emailLower.includes('@admin.') || 
                 emailLower.startsWith('admin@');
  
  return isAdmin ? 
         { id: 1, name: 'admin' } : 
         { id: 4, name: 'usuario' };
};

// Verificar si usuario es admin (compatible con múltiples formatos)
export const isAdmin = (user) => {
  if (!user) return false;
  
  // 1. Si user.rol es string directo
  if (typeof user.rol === 'string') {
    return getRoleName(user.rol) === 'admin';
  }
  
  // 2. Si user.rol es objeto con propiedad 'nombre'
  if (user.rol && typeof user.rol === 'object' && user.rol.nombre) {
    return getRoleName(user.rol.nombre) === 'admin';
  }
  
  // 3. Si tiene rol_id
  if (user.rol_id && (user.rol_id === 1 || user.rol_id === '1')) {
    return true;
  }
  
  // 4. Si el rol está en user.role (alternativa)
  if (user.role) {
    return getRoleName(user.role) === 'admin';
  }
  
  return false;
};

// Verificar si usuario tiene permiso
export const hasPermission = (user, requiredRole) => {
  if (!user) return false;
  
  // Admin tiene acceso a todo
  if (isAdmin(user)) return true;
  
  // Normalizar requiredRole
  const requiredNormalized = getRoleName(requiredRole);
  
  // Verificar si el usuario tiene el rol requerido
  const userRole = getRoleName(user.rol || user.role || user.rol_id);
  
  return userRole === requiredNormalized;
};

// Para mantener compatibilidad (opcional)
export const ROLES = {
  1: 'admin',
  4: 'usuario'
};

export const ROLE_IDS = {
  'admin': 1,
  'administrador': 1,
  'usuario': 4,
  'user': 4
};