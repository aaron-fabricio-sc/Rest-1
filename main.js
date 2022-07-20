const URL = "https://api.thedogapi.com/v1/images/search?limit=5";

const peticion = async () => {
  const $imagenes = document.getElementById("imagenes");
  const getData = await fetch(URL);
  const json = await getData.json();
  const fragment = document.createDocumentFragment();
  json.forEach((element) => {
    const $img = document.createElement("img");
    $img.src = element.url;
    $img.width = "350";
    fragment.appendChild($img);
    console.log($img);
  });

  $imagenes.appendChild(fragment);
};
