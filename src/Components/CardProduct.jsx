import React from "react";

export default function CardProduct({
  title,
  price,
  img,
  imgAlt = "",
  details = [],
  headerClass = "bg-primary text-white",
  btnClass = "btn-primary",
  onAdd,
  id
}) {
  return (
    <article className="card h-100 text-center" aria-labelledby={id ? `${id}-title` : undefined}>
      <figure className="m-0">
        <img src={img} alt={imgAlt || title} className="card-img-top" onError={(e) => { e.currentTarget.src = "/img/placeholder.webp"; }} />
      </figure>
      <header className={`card-header ${headerClass}`}>
        <h3 id={id ? `${id}-title` : undefined} className="h6 mb-0">{title}</h3>
      </header>
      <div className="card-body">
        <p className="card-title h3 mb-3" aria-hidden="true">{price}</p>
        <ul className="list-unstyled mb-3" aria-label={`${title} detalles`}>
          {details.map((d, i) => (
            <li key={i} className="py-1">{d}</li>
          ))}
        </ul>
        <button
          type="button"                 // IMPORTANTE: evitar submit por defecto
          className={`btn ${btnClass}`}
          onClick={(e) => {
            // UI-friendly guard: mark the button as 'adding' via a data attribute
            // so we prevent duplicate clicks without visually disabling it.
            const btn = e.currentTarget;
            if (btn.dataset.adding === "1") return;
            btn.dataset.adding = "1";
            btn.setAttribute("aria-busy", "true");
            setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);

            if (typeof onAdd === "function") {
              try {
                onAdd();
              } catch (err) {
                console.error("Error en onAdd:", err);
              }
            } else {
              console.warn("onAdd no está definido para", title);
            }
          }}
          aria-label={`Agregar ${title} al carrito`}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}