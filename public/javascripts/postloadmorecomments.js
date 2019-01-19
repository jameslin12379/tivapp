const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
const lastcharacter = url[url.length-1];
if (lastcharacter === '/'){
    url = url.substring(0, url.length-1);
}
let postid = url.substring(url.lastIndexOf('/')+1);
let count = document.getElementsByClassName('container-item').length;
let total = Number(document.getElementById('commentscount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.tiv67.com.dev/api/posts/${postid}/comments` : `https://www.tiv67.com/api/posts/${postid}/comments`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result = result.results;
                result.forEach(comment => {
                    const div = document.createElement('div');
                    div.classList.add("et_pb_module");
                    div.classList.add("et_pb_blurb");
                    div.classList.add("et_pb_blurb_0");
                    // div.classList.add("et_animated");
                    div.classList.add("et_pb_bg_layout_light");
                    div.classList.add("et_pb_text_align_left");
                    div.classList.add("et_pb_blurb_position_left");
                    div.classList.add("container-item");
                    const div2 = document.createElement('div');
                    div2.classList.add("et_pb_blurb_content");
                    div.appendChild(div2);
                    const div3 = document.createElement('div');
                    div3.classList.add("et_pb_blurb_container");
                    div2.appendChild(div3);
                    const h4 = document.createElement('h4');
                    h4.classList.add("et_pb_module_header");
                    div3.appendChild(h4);
                    const link = document.createElement('a');
                    link.setAttribute("href", `/comments/${comment.id}`);
                    link.innerText = comment.description;
                    h4.appendChild(link);
                    const div4 = document.createElement('div');
                    div4.classList.add("et_pb_blurb_description");
                    div3.appendChild(div4);
                    const link2 = document.createElement('a');
                    link2.classList.add("brown");
                    link2.setAttribute("href", `/users/${comment.userid}`);
                    link2.innerText = comment.username;
                    div4.appendChild(link2);
                    const p = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.innerText = moment(comment.datecreated).format('LLL');
                    p.appendChild(strong);
                    div4.appendChild(p);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('container-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});


