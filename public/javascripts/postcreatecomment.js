// when form is submitted, stop its default behavior
// extract data from form and submit using fetch post to /comments
// route will validate input and if there is an error, return
// failed = true to client and client using if conditional will toggle
// hidden error message and when user resubmits
// the same process repeats and assume this time validation passed
// so value gets saved to DB and using returned row data
// return it to client along with failed = false and
// using if conditional toggle error message so it is hidden again
// , clear textarea, and insert a comment using returned data row
// into DOM at the top of comments list and increment post comments count by 1

let commentform = document.getElementById('commentform');
let commentformurl = '/comments';
let commentformpostid = url.substring(url.lastIndexOf('/')+1);
let commentformtextarea = document.getElementById('commentformtextarea');
let commentformerrors = document.getElementsByClassName('commentformerrors');
let emptyerror = document.getElementById('emptyerror');
let lengtherror = document.getElementById('lengtherror');
let commentscount = document.getElementById('commentscount');


commentform.addEventListener('submit', (e)=> {
    e.preventDefault();
    let description = commentformtextarea.value;
    fetch(commentformurl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({description: description, postid: commentformpostid})
    }).then(response => response.json()).then(result => {
            if (!result.status) {
                for (let i = 0; i < result.errors.length; i++) {
                    if (result.errors[i].msg === "Empty description.") {
                        emptyerror.classList.remove('hidden');
                    }
                    if (result.errors[i].msg === "Description must be between 5-300 characters.") {
                        lengtherror.classList.remove('hidden');
                    }
                }
            }
            else {
                    commentscount.innerText = (Number(commentscount.innerText) + 1) + '';
                    emptyerror.classList.add('hidden');
                    lengtherror.classList.add('hidden');
                    commentformtextarea.value = '';
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
                    link.setAttribute("href", `/comments/${result.comment[0].id}`);
                    link.innerText = result.comment[0].description;
                    h4.appendChild(link);
                    const div4 = document.createElement('div');
                    div4.classList.add("et_pb_blurb_description");
                    div3.appendChild(div4);
                    const link2 = document.createElement('a');
                    link2.classList.add("brown");
                    link2.setAttribute("href", `/users/${result.comment[0].userid}`);
                    link2.innerText = result.comment[0].username;
                    div4.appendChild(link2);
                    const p = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.innerText = moment(result.comment[0].datecreated).format('LLL');
                    p.appendChild(strong);
                    div4.appendChild(p);
                    container.insertBefore(div, container.firstChild);
                }
            });
        });


