import React from "react";

export default function CardProduct({
  title,
  price,
  img,
  imgAlt = "",
  description,
  details = [],
  headerClass = "bg-primary text-white",
  btnClass = "btn-primary",
  onAdd,
  id,
  stock
}) {

  // Function to generate default descriptions based on product type
  const getDefaultDescription = (productTitle) => {
    const descriptions = {
      // Mangas
      "Gachiakuta": "Manga de acción y supervivencia protagonizado por un joven luchador en un mundo brutal.",
      "Hunter x Hunter": "Aventura épica de Gon en busca de su padre y el título de cazador.",
      "Komi-san": "Historia de una chica callada que quiere hacer amigos en la escuela.",
      "Boruto": "Secuela de Naruto con la próxima generación de ninjas.",
      "Spy x Family": "Familia falsa unida por secretos en una misión de espionaje.",
      "Your Name": "Historia romántica sobre almas intercambiadas entre dos jóvenes.",

      // Figuras
      "Figura de Rem": "Bella figura coleccionable de Rem de Re:Zero.",
      "Figura de Death Note": "Figura detallada de Ryuk del famoso Death Note.",
      "Figura de Demon Slayer": "Figura de Tanjiro y su espada Nichirin.",
      "Figura de One Punch Man": "Figura del héroe más fuerte, Saitama.",
      "Figura de Jujutsu Kaisen": "Figura de Satoru Gojo con sus poderes especiales.",
      "Figura de Hunter x Hunter": "Figura de Gon con su arco y flecha.",
      "Spy x Family": "Figura de 15 cm de Anya.",
      "Haikyuu": "Figura de Hinata y su pasión por el voleibol.",
      "Rengoku": "Figura del valiente Pilar de las Llamas.",
      "Sasuke": "Figura de Sasuke Uchiha con Sharingan.",
      "Shinobu": "Figura de Shinobu Kocho, la pilar de insectos.",

      // Consolas
      "Nintendo Switch OLED Deluxe": "Consola híbrida premium con pantalla OLED mejorada.",
      "Retro Gaming Console": "Consola retro con juegos clásicos incluidos.",
      "Xbox 360": "Consola clásica de Microsoft con gran biblioteca de juegos.",
      "Nintendo 64": "Consola icónica con juegos memorables como Mario 64.",
      "Joystick Atari": "Control retro para juegos clásicos de Atari.",

      // Cartas
      "Yu-Gi-Oh!": "Deck completo de Yu-Gi-Oh! con cartas poderosas.",
      "Pokémon Lugia": "Carta holográfica rara de Lugia, legendaria.",
      "League of Legends": "Cartas coleccionables del mundo de LoL.",
      "Sobre de Cartas": "Sobre sellado con cartas aleatorias sorpresa.",
      "Cartas juego de tronos": "Cartas temáticas de la serie Juego de Tronos.",
      "Mitos y Leyendas": "Cartas de fantasía con criaturas míticas."
    };

    return descriptions[productTitle] || "Producto de colección de alta calidad.";
  };
  return (
    <article className="card h-100 text-center" aria-labelledby={id ? `${id}-title` : undefined}>
      <figure className="m-0">
        <img src={img.replace(/ /g, '%20')} alt={imgAlt || title} className="card-img-top" onError={(e) => { console.log('Image failed to load:', img); e.currentTarget.src = "/Img/placeholder.jpg"; }} />
      </figure>
      <header className={`card-header ${headerClass}`}>
        <h3 id={id ? `${id}-title` : undefined} className="h6 mb-0">{title}</h3>
      </header>
      <div className="card-body">
        <p className="card-title h3 mb-3" aria-hidden="true">${typeof price === 'number' ? price.toFixed(2) : price || '0.00'}</p>
        <p className="card-text text-muted small mb-3" style={{minHeight: '2.5rem'}}>
          {description || getDefaultDescription(title)}
        </p>
        <ul className="list-unstyled mb-3" aria-label={`${title} detalles`}>
          {details.map((d, i) => (
            <li key={i} className="py-1">{d}</li>
          ))}
          {stock !== undefined && (
            <li className="py-1">
              <small className={`text-${stock <= 5 ? 'danger' : stock <= 10 ? 'warning' : 'muted'}`}>
                Stock: {stock} {stock <= 5 ? '¡Últimas unidades!' : stock <= 10 ? 'Pocas unidades' : 'unidades'}
              </small>
            </li>
          )}
        </ul>
        <button
          type="button"                 // IMPORTANTE: evitar submit por defecto
          className={`btn ${btnClass} ${stock === 0 ? 'disabled' : ''}`}
          disabled={stock === 0}
          onClick={(e) => {
            const btn = e.target;
            if (stock === 0) return; // Previene agregar si está agotado

            // Simple debounce using disabled state
            if (btn.disabled) return;
            btn.disabled = true;
            btn.textContent = "Agregando...";

            setTimeout(() => {
              btn.disabled = false;
              btn.textContent = stock === 0 ? 'Agotado' : 'Agregar';
            }, 1000);

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
          {stock === 0 ? 'Agotado' : 'Agregar'}
        </button>
      </div>
    </article>
  );
}