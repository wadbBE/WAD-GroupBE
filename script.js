const URI = 'https://wadbbe.github.io/WAD-GroupBE/posts.json'
const months = ["January", "February", "March", "April","May", "June", "July", "August","September", "October", "November", "December"];

/* Retrieving JSON from endpoint
let json = fetch(URI)
            .then(response => response.json())
            .then(json => {
                const posts = jsonToHTML(json)
                document.getElementById('postSection').innerHTML = posts;
            })
            .catch(error => console.error('error ', error));
*/

// Retrieving JSON data from file
let json = fetch('posts.json')
            .then(response => response.json())
            .then(json => {
                const posts = jsonToHTML(json)
                document.getElementById('postSection').innerHTML = posts;
                console.log("Loaded posts:");
                console.log(posts);
            })
            .catch(error => console.error('error ', error));

// helper function for parsing dates
function parseDate(date) {
    const parts = date.split('-');
    const year = parts[0];
    const month = months[parseInt(parts[1]) - 1] // Find the corresponding month from date
    const day = parseInt(parts[2]); // parseInt used to avoid having '02' as day

    return  month.charAt(0).toUpperCase() + month.slice(1) + ' ' + day + ', ' + year;
}

function jsonToHTML(json) {
    const posts = json.map(post =>
        `
        <article class="post">
                    <header class="post-header">
                        <img src="images/profile.jpg" alt="Profile" class="author-icon">
                        <span class="post-date">${parseDate(post.date)}</span> 
                    </header>

                    ${post.image ?
                        `<div class="post-media"> <img src=${post.image} alt="Delta"> </div>` :
                        ``
                    }

                    <p class="post-text"> ${post.text} </p> 

                    <button class="like">
                        <img src="images/like.jpg" alt="Like">
                    </button>
        </article>
        `
    ).join("");

    return posts;
}