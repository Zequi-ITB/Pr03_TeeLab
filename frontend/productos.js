const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]
`;

function init() {

}

let productos = JSON.parse(productosJSON);
console.log(productos);

function muestraProducto() {
  let section = document.createElement("section");
  let contenidor = document.createElement("div");
  let titolBotiga = document.createElement("h2");
  titolBotiga.textContent = "TeeLab - Tu tienda de camisetas"
  contenidor.className = "contGeneral";
  section.appendChild(titolBotiga);
  section.appendChild(contenidor);
  for (let producto of productos) {
    let article = document.createElement('article');
    let img = crearImagen(producto);
    let h2 = document.createElement("h2");
    h2.textContent = producto.nombre;

    let contCos = crearCuerpoTarjeta(producto);

    article.append(img);
    article.append(h2);


    let talla = crearTallas(producto);
    contCos.append(talla);

    let colors = crearColor(producto);
    contCos.append(colors);

    article.append(contCos);
    let boton = crearBoton();
    article.append(boton);

    contenidor.append(article);
  }
  document.body.append(section);



}


function crearImagen(producto) {
  let img = document.createElement("img");
  img.src = Object.values(producto.imagenes)[0];

  return img;
}


function crearTallas(producto) {
  let talla = document.createElement("select");
  let contTalla = document.createElement("div");
  let titol = document.createElement("h4");
  titol.textContent = "Talla: "
  contTalla.append(titol);
  producto.tallas.forEach(t => {
    let option = document.createElement("option");
    option.textContent = t;
    talla.append(option);
  })
  contTalla.className = "contTalla";
  contTalla.append(talla);

  return contTalla;
}

function crearColor(producto) {
  let contenidor = document.createElement("div");
  contenidor.className = "contGeneralColors";
  let contenidor2 = document.createElement("div");
  let contTitol = document.createElement("div");
  contenidor2.className = "contColor";
  let h4 = document.createElement("h4");
  h4.textContent = "Color: "
  contTitol.append(h4);
  contenidor.append(contTitol);
  producto.colores.forEach(c => {
    let color = document.createElement("div");
    let boton = document.createElement("button");
    boton.className = "color"
    boton.textContent = c;
    color.append(boton);
    contenidor2.append(color);
  })
  contenidor.append(contenidor2);

  return contenidor;
}

function crearBoton() {
  let contBoton = document.createElement("div");
  let boton = document.createElement("button");
  contBoton.className = "botonCarrito";
  boton.textContent = "AÑADIR AL CARRITO";
  contBoton.appendChild(boton);

  return contBoton;
}

function crearCuerpoTarjeta(producto) {
  let contCos = document.createElement("div");
  contCos.className = "contenidorCos";

  let p = document.createElement("p");
  p.textContent = producto.descripcion;
  let preu = document.createElement("p");
  preu.className = "preu";
  preu.textContent = producto.precioBase + "€";
  contCos.append(p);
  contCos.append(preu);

  return contCos;
}



muestraProducto();


