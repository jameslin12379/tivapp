const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
const API_URL = window.location.hostname.includes("dev") ? 'https://api.tiv67.com.dev/posts' : 'https://api.tiv67.com/posts';
let url = window.location.pathname;
const lastcharacter = url[url.length-1];
if (lastcharacter === '/'){
    url = url.substring(0, url.length-1);
}
let topicid = url.substring(url.lastIndexOf('/') + 1);
let count = document.getElementsByClassName('container-item').length;
let total = Number(document.getElementById('postscount').innerText);
let skip = count;
let limit = 10;
let loading = false;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(`${API_URL}?filter[fields][id]=true&filter[fields][name]=true&filter[fields][description]=true&filter[fields][imageurl]=true&filter[fields][videourl]=true&filter[fields][datecreated]=true&filter[fields][posttype]=true&filter[where][topicid]=${topicid}&filter[order]=datecreated%20DESC&filter[limit]=${limit}&filter[skip]=${skip}`).then(response => response.json()).then(result => {
                result.forEach(post => {
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
                    if (post.posttype === 1){
                        const link = document.createElement('a');
                        link.setAttribute("href", `/posts/${post.id}`);
                        link.innerText = post.name;
                        h4.appendChild(link);
                    } else {
                        const link = document.createElement('a');
                        link.setAttribute("href", `/posts/${post.id}`);
                        link.innerText = `/posts/${post.id}`;
                        h4.appendChild(link);
                    }
                    const div4 = document.createElement('div');
                    div4.classList.add("et_pb_blurb_description");
                    div3.appendChild(div4);
                    if (post.posttype === 1){
                        const p = document.createElement('p');
                        p.innerText = post.description;
                        div4.appendChild(p);

                    } else if (post.posttype === 2){
                        const img = document.createElement('img');
                        img.setAttribute("src", post.imageurl);
                        div4.appendChild(img);
                    } else {
                        const video = document.createElement('video');
                        const source = document.createElement('source');
                        video.setAttribute("controls", true);
                        video.setAttribute("allowfullscreen", true);
                        source.setAttribute("src", post.videourl);
                        source.setAttribute("type", "video/mp4");
                        video.appendChild(source);
                        div4.appendChild(video);
                    }
                    const p2 = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.innerText = moment(post.datecreated).format('LLL');
                    p2.appendChild(strong);
                    div4.appendChild(p2);
                    container.appendChild(div);
                });
                count = document.getElementsByClassName('container-item').length;
                skip = count;
                loading = false;
            });
        }
    }
});
