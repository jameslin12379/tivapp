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
let total = Number(document.getElementById('likescount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.tiv67.com.dev/api/users/${userid}/likes` : `https://www.tiv67.com/api/users/${userid}/likes`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result = result.results;
                result.forEach(post => {
                    const div = document.createElement('div');
                    div.classList.add("mb-50");
                    div.classList.add("container-item");
                    const div2 = document.createElement('div');
                    div2.classList.add("mb-15");
                    if (post.posttype === 1) {
                        const link = document.createElement('a');
                        link.setAttribute("href", `/posts/${post.id}`);
                        link.innerText = post.name;
                        link.classList.add("bold");
                        div2.appendChild(link);
                    }
                    else {
                        const link = document.createElement('a');
                        link.setAttribute("href", `/posts/${post.id}`);
                        link.innerText = `/posts/${post.id}`;
                        link.classList.add("bold");
                        div2.appendChild(link);
                    }
                    div.appendChild(div2);
                    if (post.posttype === 1){
                        const p = document.createElement('p');
                        p.classList.add("mb-15")
                        p.innerText = post.description;
                        div.appendChild(p);
                    } else if (post.posttype === 2){
                        const div3 = document.createElement('div3');
                        div3.classList.add("mb-15");
                        div3.classList.add("flex");
                        div3.classList.add("jc-center");
                        const img = document.createElement('img');
                        img.setAttribute("src", post.imageurl);
                        img.classList.add("image");
                        div3.appendChild(img);
                        div.appendChild(div3);
                    } else {
                        const div4 = document.createElement('div');
                        div4.classList.add("mb-15");
                        div4.classList.add("flex");
                        div4.classList.add("jc-center");
                        const video = document.createElement('video');
                        const source = document.createElement('source');
                        video.setAttribute("controls", true);
                        video.setAttribute("allowfullscreen", true);
                        video.classList.add("video");
                        source.setAttribute("src", post.videourl);
                        source.setAttribute("type", "video/mp4");
                        video.appendChild(source);
                        div4.appendChild(video);
                        div.appendChild(div4);
                    }
                    const div5 = document.createElement('div');
                    div5.classList.add("flex");
                    div.appendChild(div5);
                    const div6 = document.createElement('div');
                    div6.classList.add("mr-15");
                    div5.appendChild(div6);
                    l1 = document.createElement('a');
                    l1.setAttribute("href", `/users/${post.userid}`);
                    i1 = document.createElement('img');
                    i1.setAttribute("src", post.userimageurl);
                    i1.classList.add('width-60');
                    i1.classList.add('height-60');
                    i1.classList.add('border-radius');
                    l1.appendChild(i1);
                    div6.appendChild(l1);
                    div7 = document.createElement('div');
                    div5.appendChild(div7);
                    const div8 = document.createElement('div');
                    l2 = document.createElement('a');
                    l2.setAttribute("href", `/users/${post.userid}`);
                    l2.innerText = post.username;
                    l2.classList.add("bold");
                    div8.appendChild(l2);
                    div7.appendChild(div8);
                    const div9 = document.createElement('div');
                    l3 = document.createElement('a');
                    l3.setAttribute("href", `/topics/${post.topicid}`);
                    l3.innerText = post.topicname;
                    l3.classList.add("bold");
                    div9.appendChild(l3);
                    div7.appendChild(div9);
                    const div10 = document.createElement('p');
                    div10.innerText = moment(post.datecreated).format('LLL');
                    div7.appendChild(div10);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('container-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});





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
// div3.classList.add("et_pb_blurb_container");
// div2.appendChild(div3);
// const h4 = document.createElement('h4');
// h4.classList.add("et_pb_module_header");
// div3.appendChild(h4);
// if (post.posttype === 1){
//     const link = document.createElement('a');
//     link.setAttribute("href", `/posts/${post.id}`);
//     link.innerText = post.name;
//     h4.appendChild(link);
// } else {
//     const link = document.createElement('a');
//     link.setAttribute("href", `/posts/${post.id}`);
//     link.innerText = `/posts/${post.id}`;
//     h4.appendChild(link);
// }
// const div4 = document.createElement('div');
// div4.classList.add("et_pb_blurb_description");
// div3.appendChild(div4);
// if (post.posttype === 1){
//     const p = document.createElement('p');
//     p.innerText = post.description;
//     div4.appendChild(p);
//
// } else if (post.posttype === 2){
//     const img = document.createElement('img');
//     img.setAttribute("src", post.imageurl);
//     div4.appendChild(img);
// } else {
//     const video = document.createElement('video');
//     const source = document.createElement('source');
//     video.setAttribute("controls", true);
//     video.setAttribute("allowfullscreen", true);
//     source.setAttribute("src", post.videourl);
//     source.setAttribute("type", "video/mp4");
//     video.appendChild(source);
//     div4.appendChild(video);
// }
// const div5 = document.createElement('div');
// div5.classList.add("flex");
// div5.classList.add("mt-15");
// div4.appendChild(div5);
// const div6 = document.createElement('div');
// div6.classList.add("pr-15");
// div5.appendChild(div6);
// l1 = document.createElement('a');
// l1.setAttribute("href", `/users/${post.userid}`);
// i1 = document.createElement('img');
// i1.setAttribute("src", post.userimageurl)
// i1.classList.add('et_pb_animation_top');
// i1.classList.add('item-image');
// l1.appendChild(i1);
// div6.appendChild(l1);
// div7 = document.createElement('div');
// div5.appendChild(div7);
// const div8 = document.createElement('div');
// l2 = document.createElement('a');
// l2.setAttribute("href", `/users/${post.userid}`);
// l2.classList.add("hd");
// l2.innerText = post.username;
// div7.appendChild(div8);
// div8.appendChild(l2);
// const div9 = document.createElement('div');
// l3 = document.createElement('a');
// l3.setAttribute("href", `/topics/${post.topicid}`);
// l3.innerText = post.topicname;
// div7.appendChild(div9);
// div9.appendChild(l3);
// const div10 = document.createElement('div');
// div10.innerText = moment(post.datecreated).format('LLL');
// div7.appendChild(div10);
// container.appendChild(div);


// // const loadMoreElement = document.querySelector('#loadMore');
// // const galleryElement = document.querySelector('#gallery');
// // const API_URL = window.location.hostname.includes("dev") ? 'https://api.gif67.com.dev/topicfollowings' : 'https://api.gif67.com/topicfollowings';
// // const API_URL2 = window.location.hostname.includes("dev") ? 'https://api.gif67.com.dev/topics' : 'https://api.gif67.com/topics';
// //
// // const url = window.location.href;
// // const first = url.substring(0, url.lastIndexOf('/'));
// // const userid = first.substring(first.lastIndexOf('/')+1);
// // let count = document.getElementsByClassName('gallery-item').length;
// // const total = Number(document.getElementById('count').getAttribute('data-count'));
// // let skip = count;
// // let limit = 12;
// //
// // document.addEventListener('scroll', () => {
// //     const rect = loadMoreElement.getBoundingClientRect();
// //     if (rect.top < window.innerHeight) {
// //         if (count < total) {
// //             fetch(`${API_URL}?filter[fields][followed]=true&filter[where][following]=${userid}
// //     &filter[order]=datecreated%20DESC&filter[limit]=${limit}&filter[skip]=${skip}`).then(response => response.json())
// //                 .then(result => {
// //                     let topicids = [];
// //                     for(let i = 0; i <result.length; i++){
// //                         topicids.push(result[i].followed);
// //                     }
// //                     fetch(`${API_URL2}?filter={"where":{"id":{"inq":[${topicids}]}}}`).then(response => response.json())
// //                         .then(r => {
// //                             r.forEach(topic => {
// //                                 const div = document.createElement('div');
// //                                 div.classList.add("gallery-item");
// //                                 const link = document.createElement('a');
// //                                 link.classList.add(["gallery-item-a", "mr-none"]);
// //                                 link.setAttribute("href", `/topics/${topic.id}`);
// //                                 const i = document.createElement('img');
// //                                 i.classList.add(["gallery-item-img"]);
// //                                 i.setAttribute("src", topic.imageurl);
// //                                 i.setAttribute("alt", "");
// //                                 link.appendChild(i);
// //                                 div.appendChild(link);
// //                                 galleryElement.appendChild(div);
// //                             });
// //                         });
// //                 });
// //             count = document.getElementsByClassName('gallery-item').length;
// //             skip = count;
// //         }
// //     }
// // });
//
// // by default, user page displays user information and latest 10 topicfollowings
// // when scrolled to the bottom, send ajax GET request to API server to retrieve next set of
// // 10 topicfollowings and if successful append them into the page
// // stop sending ajax requests when there are no more posts
//
// const loadMore = document.querySelector('#loadMore');
// const container = document.querySelector('#container');
// const API_URL = window.location.hostname.includes("dev") ? 'https://api.post67.com.dev/upvotes' : 'https://api.post67.com/upvotes';
// const API_URL2 = window.location.hostname.includes("dev") ? 'https://api.post67.com.dev/posts' : 'https://api.post67.com/posts';
// let url = window.location.href;
// const lastcharacter = url[url.length-1];
// if (lastcharacter === '/'){
//     url = url.substring(0, url.length-1);
// }
// url = url.substring(0, url.lastIndexOf('/'));
// let userid = url.substring(url.lastIndexOf('/')+1);
// let count = document.getElementsByClassName('container-item').length;
// let total = Number(document.getElementById('upvotescount').innerText);
// let skip = count;
// let limit = 10;
// let loading = false;
//
// document.addEventListener('scroll', () => {
//     const rect = loadMore.getBoundingClientRect();
//     if (rect.top < window.innerHeight && !loading) {
//         loading = true;
//         if (count < total) {
//             fetch(`${API_URL}?filter[fields][upvoted]=true&filter[where][upvote]=${userid}&filter[order]=datecreated%20DESC&filter[limit]=${limit}&filter[skip]=${skip}`).then(response => response.json())
//                 .then(result => {
//                     let postids = [];
//                     for (let i = 0; i < result.length; i++) {
//                         postids.push(result[i].upvoted);
//                     }
//                     fetch(`${API_URL2}?filter={"where":{"id":{"inq":[${postids}]}}}`).then(response => response.json())
//                         .then(r => {
//                             r.forEach(post => {
//                                 const div = document.createElement('div');
//                                 div.classList.add("et_pb_module");
//                                 div.classList.add("et_pb_blurb");
//                                 div.classList.add("et_pb_blurb_2");
//                                 div.classList.add("et_pb_bg_layout_light");
//                                 div.classList.add("et_pb_text_align_left");
//                                 div.classList.add("et_pb_blurb_position_left");
//                                 div.classList.add("mb-30");
//                                 div.classList.add("box-shadow-none");
//                                 div.classList.add("container-item");
//                                 const div2 = document.createElement('div');
//                                 div2.classList.add("et_pb_blurb_content");
//                                 const div3 = document.createElement('div');
//                                 div3.classList.add("et_pb_blurb_container");
//                                 const link = document.createElement('a');
//                                 link.setAttribute("href", `/posts/${post.id}`);
//                                 const h4 = document.createElement('h4');
//                                 h4.classList.add("et_pb_module_header");
//                                 h4.innerText = post.name;
//                                 const div4 = document.createElement('div');
//                                 div4.classList.add("et_pb_blurb_description");
//                                 const p1 = document.createElement('p');
//                                 p1.innerText = post.description;
//                                 const i = document.createElement('img');
//                                 i.setAttribute("src", post.imageurl);
//                                 const p2 = document.createElement('p');
//                                 const str = document.createElement('strong');
//                                 str.innerText = moment(post.datecreated).format('LLL');
//                                 div.appendChild(div2);
//                                 div2.appendChild(div3);
//                                 div3.appendChild(link);
//                                 link.appendChild(h4);
//                                 div3.appendChild(div4);
//                                 div4.appendChild(p1);
//                                 div4.appendChild(i);
//                                 div4.appendChild(p2);
//                                 p2.appendChild(str);
//                                 container.appendChild(div);
//                             });
//                             count = document.getElementsByClassName('container-item').length;
//                             skip = count;
//                             loading = false;
//                         });
//                 });
//         }}});
