import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../Components/Header';

import './Perfil.css';

export default function Perfil() {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    avatar: user?.avatar || ''
  }));

  // keep a fileRef so clearing input is easy
  const fileRef = useRef(null);

  const onPickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s) => ({ ...s, avatar: reader.result }));
    };
    reader.readAsDataURL(f);
  };

  const onSave = () => {
    const updated = {
      ...user,
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      avatar: form.avatar
    };
    // update context (and localStorage) via login setter
    try { login(updated); } catch (e) { console.warn('save profile failed', e); }
    setEditing(false);
  };

  const onCancel = () => {
    setForm({ nombre: user?.nombre || '', email: user?.email || '', telefono: user?.telefono || '', direccion: user?.direccion || '', avatar: user?.avatar || '' });
    if (fileRef.current) fileRef.current.value = null;
    setEditing(false);
  };

  return (
    <div>
      <Header />

      <main className="container my-5 perfil-page">
        <h1 className="mb-4">Mi perfil</h1>

        {!user ? (
          <div className="alert alert-info">No hay usuario logueado</div>
        ) : (
          <div className="card mx-auto perfil-card">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-3">
                <div className="avatar-wrap text-center text-md-start">
                  <img
                    src={form.avatar || '/Img/iconousuario.webp'}
                    alt="avatar"
                    className="rounded-circle perfil-avatar"
                  />
                  {editing && (
                    <div className="mt-2">
                      <input ref={fileRef} type="file" accept="image/*" className="form-control form-control-sm" onChange={onPickFile} />
                    </div>
                  )}
                </div>

                <div className="flex-grow-1 w-100">
                  {!editing ? (
                    <>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h2 className="mb-0 perfil-name">{user.nombre || user.email}</h2>
                          <div className="text-muted perfil-role">{user.rol || 'Cliente'}</div>
                        </div>
                        <div className="ms-3 text-end d-none d-md-block">
                          <div className="mb-2 small text-muted">{user.email}</div>
                          <button className="btn btn-outline-primary" onClick={() => setEditing(true)}>Editar</button>
                        </div>
                      </div>

                      <dl className="row mt-3 mb-2">
                        <dt className="col-sm-3">Email</dt>
                        <dd className="col-sm-9">{user.email}</dd>

                        {user.telefono && (
                          <>
                            <dt className="col-sm-3">Teléfono</dt>
                            <dd className="col-sm-9">{user.telefono}</dd>
                          </>
                        )}

                        {user.direccion && (
                          <>
                            <dt className="col-sm-3">Dirección</dt>
                            <dd className="col-sm-9">{user.direccion}</dd>
                          </>
                        )}
                      </dl>

                      <div className="mt-3 text-end d-block d-md-none">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(true)}>Editar</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row g-2">
                        <div className="col-12 col-md-6">
                          <label className="form-label small mb-1">Nombre</label>
                          <input value={form.nombre} onChange={(e) => setForm(s => ({ ...s, nombre: e.target.value }))} className="form-control form-control-sm" />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label small mb-1">Email</label>
                          <input value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} className="form-control form-control-sm" />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label small mb-1">Teléfono</label>
                          <input value={form.telefono} onChange={(e) => setForm(s => ({ ...s, telefono: e.target.value }))} className="form-control form-control-sm" />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label small mb-1">Dirección</label>
                          <input value={form.direccion} onChange={(e) => setForm(s => ({ ...s, direccion: e.target.value }))} className="form-control form-control-sm" />
                        </div>
                      </div>

                      <div className="d-flex gap-2 justify-content-end mt-3">
                        <button className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Cancelar</button>
                        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
