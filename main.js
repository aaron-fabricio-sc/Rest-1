const URL =
  "https://api.thedogapi.com/v1/images/search?limit=5&api_key=7f4a02b3-15b2-4937-8740-d4e74e548b9c";

const peticion = async () => {
  const $imagenes = document.getElementById("imagenes");

  const $containerFavoritos = document.getElementById("containerFavoritos");
  const getData = await fetch(URL);
  const json = await getData.json();
  const fragmentRandom = document.createDocumentFragment();
  const fragmentFavoritos = document.createDocumentFragment();

  json.forEach((element) => {
    const $img = document.createElement("img");
    const $botton = document.createElement("button");
    $img.src = element.url;
    $img.width = "350";
    $botton.id = "clickFavoritos";
    $botton.innerHTML = "Agregar a favoritos";
    fragmentRandom.appendChild($img);
    fragmentRandom.appendChild($botton);
    console.log($img);
  });

  const $imgFavoritos = document.createElement("img");
  const $article = document.createElement("article");
  $templateFavorito = `
        <img src="" alt="perro favorito">
      <button class="btnEliminarFavoritos">Eliminar de favoritos</button>`;

  $article.innerHTML = $templateFavorito;
  fragmentFavoritos.appendChild($article);

  $imagenes.appendChild(fragmentRandom);
  $containerFavoritos.appendChild(fragmentFavoritos);
};
