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
        <img src={img} alt={imgAlt || title} className="card-img-top" />
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
          type="button"
          className={`btn ${btnClass}`}
          onClick={onAdd}
          aria-label={`Agregar ${title} al carrito`}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}