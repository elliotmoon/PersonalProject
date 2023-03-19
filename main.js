//defining variables for js script
const form = document.getElementById("searchMe"); //target the form tag in the html file
const search = document.getElementById("lyricSearch"); //target the input field
const output = document.getElementById("search-result"); //target the output `div`

const api = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        startSearch(searchValue);
    }
})
async function startSearch(searchValue) {
    const searchResult = await fetch(`${api}/suggest/${searchValue}`);
    const data = await searchResult.json();
    console.log(data);
    showData(data);
}

 //Display Search Result
function showData(data) {
    output.innerHTML = `
    <ul class="lyrics">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}