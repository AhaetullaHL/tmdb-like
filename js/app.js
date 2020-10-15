document.addEventListener("DOMContentLoaded", function ()
{
    app();

})

/**
 * App
 */
function app()
{

    const popularList = document.querySelector('.popular-list');
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=a1eba11ccbaf7131e5ea3d8594b2dfee&language=fr-FR';
    const basicUrlImg = 'https://image.tmdb.org/t/p/w500';
    fetch(url)
        .then(
            resp => resp.json()

        )
        .then(data => {
            let popularListFetched = data.results;

            return popularListFetched.map(function (movie)
            {
                console.log(movie)
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span'),
                    div = createNode('div'),
                    h3 = createNode('h3'),
                    h4 = createNode('h4');
                // movie img
                img.src = `${basicUrlImg}${movie.poster_path}`;
                addClass(img, 'movie-img');
                //movie average
                span.textContent = movie.vote_average;
                addClass(span, 'movie-note');
                //movie title
                h3.textContent = movie.title;
                addClass(h3, 'movie-title')
                //movie release date
                const dateOptions = {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }
                let date = new Date(movie.release_date);
                h4.textContent = date.toLocaleDateString('fr-FR', dateOptions);
                addClass(h4, 'movie-date');
                //div with title & release date
                addClass(div, 'movie-infos');
                append(div, h3);
                append(div, h4);
                //li movie card element
                addClass(li, 'movie-card');
                append(li, img);
                append(li, span);
                append(li, div);
                //adding in popular list ul
                append(popularList, li);
            })

        })
        .catch(err => console.error('failed: ' + err))
}

/**
 *
 * @param el
 * @returns {*}
 */
function createNode(el)
{
    return document.createElement(el);
}

/**
 * @param parent
 * @param el
 * @returns {*|ActiveX.IXMLDOMNode}
 */
function append(parent, el)
{
    return parent.appendChild(el);
}

/**
 * @param el
 * @param Class : string
 */
function addClass(el, Class)
{
    return el.classList.add(Class);
}