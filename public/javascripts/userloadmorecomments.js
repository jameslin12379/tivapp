const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
const lastcharacter = url[url.length-1];
if (lastcharacter === '/'){
    url = url.substring(0, url.length-1);
}
url = url.substring(0, url.lastIndexOf('/'));
let userid = url.substring(url.lastIndexOf('/')+1);
let count = document.getElementsByClassName('container-item').length;
let total = Number(document.getElementById('commentscount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.tiv67.com.dev/api/users/${userid}/comments` : `https://www.tiv67.com/api/users/${userid}/comments`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result = result.results;
                result.forEach(comment => {
                    const div = document.createElement('div');
                    div.classList.add("flex");
                    div.classList.add("mb-50");
                    const div2 = document.createElement('div');
                    div2.classList.add("mr-15");
                    div.appendChild(div2);
                    l1 = document.createElement('a');
                    l1.setAttribute("href", `/users/${comment.userid}`);
                    i1 = document.createElement('img');
                    i1.setAttribute("src", comment.imageurl);
                    i1.classList.add('width-60');
                    i1.classList.add('height-60');
                    i1.classList.add('border-radius');
                    l1.appendChild(i1);
                    div2.appendChild(l1);
                    div3 = document.createElement('div');
                    div.appendChild(div3);
                    const div4 = document.createElement('div');
                    l2 = document.createElement('a');
                    l2.setAttribute("href", `/users/${comment.userid}`);
                    l2.innerText = comment.username;
                    l2.classList.add("bold");
                    div4.appendChild(l2);
                    div3.appendChild(div4);
                    const div5 = document.createElement('div');
                    l3 = document.createElement('a');
                    l3.setAttribute("href", `/comments/${comment.id}`);
                    l3.innerText = comment.description;
                    div5.appendChild(l3);
                    div3.appendChild(div5);
                    const div6 = document.createElement('p');
                    div6.innerText = moment(comment.datecreated).format('LLL');
                    div3.appendChild(div6);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('container-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});

//
// <div class="flex mb-30">
//     <div class="mr-15">
//     <a href="/users/<%= results[1][i].userid %>"><img src="<%= results[1][i].imageurl %>" alt="" class="width-70 height-70 border-radius" /></a>
//     </div>
//     <div>
//     <div><a href="/users/<%= results[1][i].userid %>"><%= results[1][i].username %></a></div>
// <div><a href="/comments/<%= results[1][i].id %>"><%= results[1][i].description %></a></div>
// <div><%= moment(results[1][i].datecreated).format('LLL') %></div>
//     </div>
//     </div>

// const div = document.createElement('div');
// div.classList.add("et_pb_module");
// div.classList.add("et_pb_blurb");
// div.classList.add("et_pb_blurb_0");
// // div.classList.add("et_animated");
// div.classList.add("et_pb_bg_layout_light");
// div.classList.add("et_pb_text_align_left");
// div.classList.add("et_pb_blurb_position_left");
// div.classList.add("container-item");
// const div2 = document.createElement('div');
// div2.classList.add("et_pb_blurb_content");
// div.appendChild(div2);
// const div3 = document.createElement('div');
// div3.classList.add("et_pb_main_blurb_image");
// div3.classList.add("pl-15");
// div2.appendChild(div3);
// const link = document.createElement('a');
// link.setAttribute("href", `/users/${comment.userid}`);
// const span = document.createElement('span');
// span.classList.add("et_pb_image_wrap");
// const img = document.createElement('img');
// img.setAttribute("src", comment.imageurl);
// // img.classList.add("et-waypoint");
// img.classList.add("et_pb_animation_top");
// img.classList.add("item-image");
// div3.appendChild(link);
// link.appendChild(span);
// span.appendChild(img);
// const div4 = document.createElement('div');
// div4.classList.add("et_pb_blurb_container");
// div2.appendChild(div4);
// // const h4 = document.createElement('h4');
// // h4.classList.add("et_pb_module_header");
// // div4.appendChild(h4);
// const link2 = document.createElement('a');
// link2.classList.add("hd");
// link2.setAttribute("href", `/users/${comment.userid}`);
// link2.innerText = comment.username;
// div4.appendChild(link2);
// const div5 = document.createElement('div');
// div5.classList.add("et_pb_blurb_description");
// div4.appendChild(div5);
// const link3 = document.createElement('a');
// link3.classList.add("brown");
// link3.setAttribute("href", `/comments/${comment.id}`);
// link3.innerText = comment.description;
// div5.appendChild(link3);
// const p = document.createElement('p');
// // const strong = document.createElement('strong');
// p.innerText = moment(comment.datecreated).format('LLL');
// // p.appendChild(strong);
// div5.appendChild(p);
// container.appendChild(div);

// const loadMore = document.querySelector('#loadMore');
// const container = document.querySelector('#container');
// const API_URL = window.location.hostname.includes("dev") ? 'https://api.tiv67.com.dev/comments' : 'https://api.tiv67.com/comments';
// let url = window.location.pathname;
// const lastcharacter = url[url.length-1];
// if (lastcharacter === '/'){
//     url = url.substring(0, url.length-1);
// }
// url = url.substring(0, url.lastIndexOf('/'));
// let userid = url.substring(url.lastIndexOf('/')+1);
// let count = document.getElementsByClassName('container-item').length;
// let total = Number(document.getElementById('commentscount').innerText);
// let skip = count;
// let limit = 10;
// let loading = false;
//
// document.addEventListener('scroll', () => {
//     const rect = loadMore.getBoundingClientRect();
//     if (rect.top < window.innerHeight && !loading) {
//         loading = true;
//         if (count < total) {
//             fetch(`${API_URL}?filter[fields][id]=true&filter[fields][description]=true&filter[fields][datecreated]=true&filter[where][userid]=${userid}&filter[order]=datecreated%20DESC&filter[limit]=${limit}&filter[skip]=${skip}`).then(response => response.json()).then(result => {
//                 result.forEach(comment => {
//                     const div = document.createElement('div');
//                     div.classList.add("et_pb_module");
//                     div.classList.add("et_pb_blurb");
//                     div.classList.add("et_pb_blurb_0");
//                     // div.classList.add("et_animated");
//                     div.classList.add("et_pb_bg_layout_light");
//                     div.classList.add("et_pb_text_align_left");
//                     div.classList.add("et_pb_blurb_position_left");
//                     div.classList.add("container-item");
//                     const div2 = document.createElement('div');
//                     div2.classList.add("et_pb_blurb_content");
//                     div.appendChild(div2);
//                     const div3 = document.createElement('div');
//                     div3.classList.add("et_pb_blurb_container");
//                     div2.appendChild(div3);
//                     const h4 = document.createElement('h4');
//                     h4.classList.add("et_pb_module_header");
//                     div3.appendChild(h4);
//                     const link = document.createElement('a');
//                     link.setAttribute("href", `/comments/${comment.id}`);
//                     link.innerText = comment.description;
//                     h4.appendChild(link);
//                     const div4 = document.createElement('div');
//                     div4.classList.add("et_pb_blurb_description");
//                     div3.appendChild(div4);
//                     const p = document.createElement('p');
//                     const strong = document.createElement('strong');
//                     strong.innerText = moment(comment.datecreated).format('LLL');
//                     p.appendChild(strong);
//                     div4.appendChild(p);
//                     container.appendChild(div);
//                 });
//                 count = document.getElementsByClassName('container-item').length;
//                 skip = count;
//                 loading = false;
//             });
//         }
//     }
// });
