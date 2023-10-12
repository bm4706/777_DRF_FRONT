const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = ()=>{
    console.log("로딩되었음")
}


// 회원가입
// async function handleSignin(){
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     const nickname = document.getElementById("nickname").value
//     const profileImage = document.getElementById("profile-image").files[0];

//     const response = await fetch(`${backend_base_url}/users/signup/`, {
//         headers:{
//             'content-type':'application/json'
//         },
//         method:'POST',
//         body: JSON.stringify({
//             "email":email,
//             "password":password,
//             "nickname":nickname
//         })
//     })
//     return response
// }
//  회원가입 (사진 추가)
async function handleSignin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nickname = document.getElementById("nickname").value;
    const profileImage = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nickname", nickname);
    formData.append("is_active", 1);
    formData.append("image", profileImage); // Use the name "profileImage" that your backend expects.

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        method: 'POST',
        body: formData, // Use FormData here
    });

    return response;
}


// 로그인
async function handleLogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch(`${backend_base_url}/users/api/token/`, {
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
    if (response.status ==200){
        const response_json = await response.json()

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        console.log(response_json)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload); 
        alert("환영합니다.")
        window.location.replace(`${frontend_base_url}/`)
    }else{
        alert("회원정보가 일치하지 않습니다.")
    }
    
}


// 모크API
async function handleMock(){
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers:{
            'Authorization':"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
        })
    console.log(response)
}


// 로그아웃
function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}


// 로그인 체크
function checkLogin() {
    const payload = localStorage.getItem("payload");
    if(payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}


// 게시글 리스트 get api
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/` )

    if (response.status ==200){
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다")
    }
}


// 게시글 작성 
// 이미지 첨부 안하면 작성안됌(400에러)
async function postArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]
    
    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    if (image) {
        formdata.append('image', image);
    }

    let token = localStorage.getItem("access")

    const response = await fetch (`${backend_base_url}/articles/`,{
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )

    if (response.status ==200){
        alert("글작성 완료!")
        window.location.replace (`${frontend_base_url}/`);
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function getArticle(articleId){
    const response=await fetch(`${backend_base_url}/articles/${articleId}/`,
    )

    if(response.status==200){
        response_json=await response.json()
        return response_json
    
    }   else{
        alert(response.status)

    }
}


async function getComments(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`,)

    if (response.status ==200){
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 댓글등록 fetch
async function postComment(articleId, newComment){
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`,{
        method: 'POST',
        headers : {
            'content-type':'application/json',
            "Authorization":`Bearer ${token}`
        },
        body :JSON.stringify({
            "content":newComment,
        })
    })

    if (response.status ==200){
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 글 삭제
async function handleDeleteArticle(button) {
    const token = localStorage.getItem("access");
    const response = await fetch(`${backend_base_url}/articles/${articleId}/`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.status == 204) {
        alert("글 삭제 완료!");
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert("권한이없습니다.", response.status);
    }
}





