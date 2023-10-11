const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () =>{
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload);
    console.log(payload_parse.email)

    const intro = document.getElementById("intro");
    intro.innerText = `${payload_parse.email}님 안녕하세요`;
    intro.textContent = "안녕하세요! 환영합니다."

    let navbarRight = document.getElementById("navbar-right");
    let newLi=document.createElement('li');
    newLi.setAttribute("class","nav-item" );

    let logoutBtn = document.createElement('button');
    logoutBtn.setAttribute('class', "nav-link btn");
    logoutBtn.innerText='로그아웃';
    logoutBtn.setAttribute('onClick', 'handleLogout()')

    newLi.appendChild(logoutBtn);

    navbarRight.appendChild(newLi);

    let loginButton= document.getElementById('login-button')
    loginButton.style.display = 'none';
}

// 기호 7강 게시글 리스트 get api + 8강 부트스트랩 그리드 + 9강 게시글 리스트 ui
function articleDetail(article_id){
    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`
}

window.onload = async function loadArticles(){
    articles = await getArticles()
    console.log(articles)

    const article_list = document.getElementById("article-list")

    articles.forEach(article => {
        const newCol = document.createElement("div")
        newCol.setAttribute("class", "col")
        newCol.setAttribute("onclick", 'articleDetail(${article.pk})')

        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", article.pk)
.appendChild(newCol)
    }
    
    );
}