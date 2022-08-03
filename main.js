const URL =
  "https://api.thedogapi.com/v1/images/search?limit=3&api_key=7f4a02b3-15b2-4937-8740-d4e74e548b9c";

const URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?api_key=7f4a02b3-15b2-4937-8740-d4e74e548b9c";

const URL_FAVORITES_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=7f4a02b3-15b2-4937-8740-d4e74e548b9c`;

document.addEventListener("DOMContentLoaded", () => {
  const messages = document.getElementById("messages");

  const peticion = async () => {
    const $imagenes = document.getElementById("imagenes");

    const getData = await fetch(URL);
    const json = await getData.json();
    const fragmentRandom = document.createDocumentFragment();
    const el = document.createElement("article");
    el.classList.add("imagenes");

    if (getData.status !== 200) {
      messages.innerHTML = `error ${getData.status}  ---  ${json.message}`;
    } else {
      json.forEach((element) => {
        const $template = `
          <img src="${element.url}" alt="">
          <button id="agregarFavoritos" class="agregarFavoritos" data-id="${element.id}">Agregar a favoritos</button>
         

        `;

        const $div = document.createElement("div");
        $div.innerHTML = $template;

        fragmentRandom.appendChild($div);

        el.appendChild(fragmentRandom);
        console.log(json);
      });

      $imagenes.insertAdjacentElement("afterbegin", el);
    }
  };

  const getFavorites = async () => {
    const $perritosFavoritos = document.getElementById("perritosFavoritos");
    $perritosFavoritos.innerHTML = "";
    const getData = await fetch(URL_FAVORITES);
    const data = await getData.json();
    const fragmentFavorites = document.createDocumentFragment();

    const $article = document.createElement("article");
    $article.classList.add("imagenes");

    if (getData.status !== 200) {
      switch (getData.status) {
        case 401:
          messages.innerHTML = `${data.message}`;
      }
    } else {
      data.forEach((el) => {
        const $template = `
          <img src="${el.image.url}" alt="">
          <button id="eliminarFavoritos" class="eliminarFavoritos" data-id=${el.id}>Eliminar de Favoritos</button>
        `;
        const $div = document.createElement("div");
        $div.innerHTML = $template;

        fragmentFavorites.appendChild($div);

        $article.appendChild(fragmentFavorites);
      });
      $perritosFavoritos.insertAdjacentElement("afterbegin", $article);
    }
  };

  const postFavorite = async (id) => {
    const getData = await fetch(URL_FAVORITES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_id: `${id}` }),
    });

    const data = await getData.json();

    if (getData.status !== 200) {
      messages.innerHTML = `Error : ${getData.status} ---- ${data.message}`;
    } else {
      getFavorites();

      console.log("agregado");
    }
  };

  const deleteFavorite = async (id) => {
    const getData = await fetch(URL_FAVORITES_DELETE(id), {
      method: "DELETE",
    });

    if (getData.status !== 200) {
      messages.innerHTML = `Error : ${getData.status} ---- ${data.message}`;
    } else {
      getFavorites();

      console.log("eliminado");
    }
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches("#getRandom")) {
      peticion();
    }
    if (e.target.matches(".agregarFavoritos")) {
      postFavorite(e.target.dataset.id);
    }

    if (e.target.matches("#verFavoritos")) {
      getFavorites();
    }

    if (e.target.matches(".eliminarFavoritos")) {
      deleteFavorite(e.target.dataset.id);
    }
  });
  peticion();
  getFavorites();
});
