
const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
let count = document.getElementsByClassName('container-item').length;
let total = 70;
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.tiv67.com.dev/api/topics` : `https://www.tiv67.com/api/topics`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result = result.results;
                result.forEach(topic => {
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
                    div3.classList.add("et_pb_main_blurb_image");
                    div2.appendChild(div3);
                    const link = document.createElement('a');
                    link.setAttribute("href", `/topics/${topic.id}`);
                    const span = document.createElement('span');
                    span.classList.add("et_pb_image_wrap");
                    const img = document.createElement('img');
                    img.setAttribute("src", topic.imageurl);
                    // img.classList.add("et-waypoint");
                    img.classList.add("et_pb_animation_top");
                    img.classList.add("item-image");
                    div3.appendChild(link);
                    link.appendChild(span);
                    span.appendChild(img);
                    const div4 = document.createElement('div');
                    div4.classList.add("et_pb_blurb_container");
                    div2.appendChild(div4);
                    const h4 = document.createElement('h4');
                    h4.classList.add("et_pb_module_header");
                    div4.appendChild(h4);
                    const link2 = document.createElement('a');
                    link2.setAttribute("href", `/topics/${topic.id}`);
                    link2.innerText = topic.name;
                    h4.appendChild(link2);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('container-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});

