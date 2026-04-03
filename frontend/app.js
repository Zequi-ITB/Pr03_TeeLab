


//INIT
function init() {
    //S'activen quan detecta qualsevol canvi de valor en els selects dels menus desplegables dels filtres
    document.getElementById("filter-size").addEventListener("change", () => {
        carregarCamisetes();
    });

    document.getElementById("filter-color").addEventListener("change", () => {
        carregarCamisetes();
    });

    document.getElementById("sort").addEventListener("change", () => {
        carregarCamisetes();
    });



    //S'active quan s'escriu qualsevol caracter a la barra de cerca
    document.getElementById("search").addEventListener("input", () => {
        carregarCamisetes();
    });



    carregarCamisetes();
}


//EVENT LISTENERS




//añadir carrito
function addToCart(camiseta) {
    let id = camiseta.dataset.id;
    let nom = camiseta.querySelector("h3").textContent;
    let size = camiseta.querySelector(".size").value;
    let colorSelect = camiseta.querySelector(".color").value;
    let quantitat = Number(camiseta.querySelector("input").value);
    let preu = Number(camiseta.querySelector(".price").textContent);

    let camisetaCarrito = {
        camisetaId: id,
        nombre: nom,
        talla: size,
        color: colorSelect,
        cantidad: quantitat,
        precio: preu
    }

    saveCart(camisetaCarrito);


}


function saveCart(camisetaCarrito) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(camisetaCarrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
}

function loadCart() {

}

function renderCart() {

}






//CAMISETES
async function carregarCamisetes() {


    //Filtros
    const size = document.getElementById("filter-size").value;
    const color = document.getElementById("filter-color").value;
    const search = document.getElementById("search").value;
    const sort = document.getElementById("sort").value;

    try {
        const datos = await getAllCamisetes(size, color, search, sort);
        if (datos) {
            loadTablaCamisetes(datos);
        }
        else console.error("ERROR AL CARGAR CAMISETAS");
    }
    catch (error) {
        alert(error.message);
    }

}

//Carregar productes
function loadTablaCamisetes(datos) {
    let main = document.getElementById("product-list");
    main.innerHTML = "";
    for (let camiseta of datos) {
        let div = document.createElement("div");
        div.className = "product-card";
        div.setAttribute("data-id", camiseta.id)
        div.innerHTML = `<img src="${Object.values(camiseta.imagenes)[0]}">
    <h3>${camiseta.nombre}</h3>
    <p>${camiseta.descripcion}</p>
    <div class="price">${camiseta.precioBase}</div>
    <div class="options">
        ${crearTallas(camiseta).outerHTML}
        ${crearColores(camiseta).outerHTML}
        <input type="number" min="1" value="1">
    </div>
    <button class="add-to-cart" >Añadir</button>`;
        main.appendChild(div);

    }


    //Agregar a carrito
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("enter");
            const botonClicat = event.target;

            //camiseta
            const camiseta = botonClicat.closest(".product-card");

            addToCart(camiseta);

        });
    });

}


function crearTallas(camiseta) {

    let tallas = document.createElement("select");
    tallas.className = "size";
    camiseta.tallas.forEach(t => {
        let option = document.createElement("option");
        option.textContent = t
        tallas.appendChild(option);
    })

    return tallas
}


function crearColores(camiseta) {
    let colores = document.createElement("select");
    colores.className = "color";

    camiseta.colores.forEach(c => {
        let option = document.createElement("option");
        option.textContent = c
        colores.appendChild(option);
    })


    return colores;
}

