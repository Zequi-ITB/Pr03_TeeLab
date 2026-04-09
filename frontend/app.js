
let timeout;

//INIT
function init() {
    // Si estem a la pàgina principal
    if (document.getElementById("product-list")) {
        initTienda();
    }

    // Si estem al carrito
    if (document.getElementById("cart-items")) {
        initCarrito();
    }

    if (document.getElementById("ticket-items")) {
        let ticket = JSON.parse(localStorage.getItem("ticket"));
        if (ticket) {
            renderTicket(ticket.comanda);
        }
    }
}


function initTienda() {
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
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            carregarCamisetes();
        }, 300);

    });


    carregarCamisetes();
}

function initCarrito() {


    document.getElementById("clear-cart").addEventListener("click", () => {
        clearCart()
        renderCart()
    });

    document.getElementById("checkout").addEventListener("click", () => {

        finalizarCompra();

    })

    renderCart();

}

function clearCart() {
    localStorage.removeItem("carrito");

}

function removeItem(id) {
    let carrito = loadCart();

    carrito = carrito.filter(camiseta => camiseta.camisetaId !== id);
    saveCart(carrito);
}

async function finalizarCompra() {
    let comanda = {
        "cliente": { "nombre": "Ezequiel", "email": "ezequiel@mail.com" },
        "direccion": { "calle": "Carrer Major 1", "cp": "08400", "ciudad": "Granollers" },
        "items": loadCart()
    }
    try {
        let confirm = await createComanda(comanda);
        if (confirm) {
            localStorage.setItem("ticket", JSON.stringify(confirm));
            clearCart();
            window.location.href = "ticket.html";
        }
        else alert("comanda vacia")
    } catch (error) {
        alert(error.message);
    }
}


function renderTicket(ticket) {

    let orderId = document.getElementById("order-id");
    orderId.innerHTML = ticket.id;

    let fecha = document.getElementById("order-date");
    fecha.innerHTML = ticket.fecha;

    let estado = document.getElementById("order-status");
    estado.innerHTML = ticket.estado;

    


    let tableBody = document.getElementById("ticket-items");
    tableBody.innerHTML = "";

    let total = document.getElementById("ticket-total");
    let totalSuma = 0;
    for (let camiseta of ticket.items) {
        totalSuma += camiseta.subtotal;
        let fila = document.createElement("tr");
        //div.className = "product-card";
        //div.setAttribute("data-id", camiseta.id)
        fila.innerHTML = `<td> 
            <span>${camiseta.camisetaId}</span>
            <span>${camiseta.nombre}</span>
    </td>
    <td>
    <span> ${camiseta.cantidad}</span>
    </td>
   <td>${camiseta.precioUnitario}</td>
   <td>${Number(camiseta.subtotal).toFixed(2)}</td>`;
        tableBody.appendChild(fila);

    }
    total.textContent = Number(totalSuma).toFixed(2);


}






//CARRITO
function addToCart(camiseta) {
    let id = camiseta.dataset.id;
    let nom = camiseta.querySelector("h3").textContent;
    let size = camiseta.querySelector(".size").value;
    let colorSelect = camiseta.querySelector(".color").value;
    let quantitat = Number(camiseta.querySelector("input").value);
    let preu = Number(camiseta.querySelector(".price").textContent);
    let image = camiseta.querySelector("img").src;

    let camisetaCarrito = {

        camisetaId: id,
        nombre: nom,
        talla: size,
        color: colorSelect,
        cantidad: quantitat,
        precio: preu,
        img: image
    }


    let carrito = loadCart();

    //Mirem que no estigui repetit i sumem les quantitats
    const itemEncontrado = carrito.find(item => item.camisetaId === id);

    if (itemEncontrado) {
        itemEncontrado.cantidad += camisetaCarrito.cantidad;
    } else {
        carrito.push(camisetaCarrito);
    }

    saveCart(carrito);
}


function saveCart(carrito) {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function loadCart() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function renderCart() {
    let tableBody = document.getElementById("cart-items");
    tableBody.innerHTML = "";

    let total = 0;


    let carrito = loadCart();
    for (let camiseta of carrito) {
        let fila = document.createElement("tr");
        //div.className = "product-card";
        //div.setAttribute("data-id", camiseta.id)
        fila.innerHTML = `<td> 
            <img src="${camiseta.img}" class="cart-img">
            <span>${camiseta.nombre}</span>
    </td>
    <td>
    <input type="number" min="1" value="${camiseta.cantidad}">
    </td>
   <td>${camiseta.precio}</td>
   <td>${calcularSubtotal(camiseta)}</td>
    <td> <button class="remove-btn" data-id="${camiseta.camisetaId}">Eliminar</button></td>`;
        tableBody.appendChild(fila);
        total += calcularSubtotal(camiseta);

    }
    document.getElementById("total-price").textContent = total;



    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {

            const id = e.target.dataset.id;

            removeItem(id);
            renderCart();
        });
    });

}

function calcularSubtotal(camiseta) {
    return Number(camiseta.precio * camiseta.cantidad);
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


    //Event listener del boto "afegir al carrito" es a dins de load tabla perque sino, se executa abans de que es carreguin els productes i per tant, no troba els buttons de "add-to-cart".
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {

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

