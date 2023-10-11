const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = ()=>{
    console.log("로딩되었음")
}

// 회원가입
async function handleSignin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const nickname = document.getElementById("nickname").value
    
    

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password,
            "nickname":nickname
        })
        
    })
    return response  
}

// 로그인
async function handleLogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers:{
            'content-type':'application/json',
            // "Authorization": `Bearer ${token}`
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
        window.location.replace(`${frontend_base_url}/front/index.html`)
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






// 기호 7강 게시글 리스트 get api
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/` )

    if (response.status ==200){
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다")
    }
}

// 선화 (12강)
async function postArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]

    const formdata = new FormData();

    formdata.append('title',title)
    formdata.append('content',content)
    formdata.append('image',image)

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

//덕영 14-17강
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



// 호진 (18강)
async function getComments(articleId) {
    const response = await fetch(`http://127.0.0.1:8000/articles/${articleId}/comment/`,)

    if (response.status ==200){
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 호진 21강 댓글등록 fetch
async function postComment(articleId, newComment){
    const response = await fetch(`http://127.0.0.1:8000//articles/${articleId}/comment/`,{
        method: 'POST',
        headers : {
            'content-type':'application/json',
            "Authorization":`Bear ${token}`
        },
        body :JSON.stringify({
            "article":newComment,
        })
    })

    if (response.status ==200){
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


