
const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
const lastcharacter = url[url.length-1];
if (lastcharacter === '/'){
    url = url.substring(0, url.length-1);
}
let topicid = url.substring(url.lastIndexOf('/') + 1);
let count = document.getElementsByClassName('container-item').length;
let total = Number(document.getElementById('postscount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.tiv67.com.dev/api/topics/${topicid}` : `https://www.tiv67.com/api/topics/${topicid}`;


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

