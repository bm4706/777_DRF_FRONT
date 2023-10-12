
let articleId




console.log("디테일 js 로드")

async function loadComments(articleId){
    const response = await getComments(articleId);
    console.log(response)

    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""
    response.forEach(comment =>{
        // 프로필사진 업로드하면 src 링크 바꿔주세요
        // const profileImageSrc = comment.user.profile_image;
        // <img class="mr-3" src="${profileImageSrc}" alt="프로필이미지" width="50" height "50">
        // 아래 li class 밑에 빈공간에 넣어야하는데.. 지금 불러오기가 안됩니다.
        commentList.innerHTML += `
        <li class="media d-flex mt-4">
        
        <div class="media-body">
          <h5 class="mt-0 mb-1">${comment.user}님</h5>
          ${comment.content}
        
        </div>
        <div >
            <button type="button" onclick="commentupdatesubmit(${comment.id},${articleId})">수정</button>

            <button type="button" onclick="commentdelete(${comment.id},${articleId})">삭제</button>
        </div>
        </li>
        `
    })
}


async function submitComment(){
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(articleId, newComment)
    console.log(response)
    commentElement.value = "" // 댓글 작성후 댓글 작성 칸을 빈공간으로 만들어줌
    
    loadComments(articleId)
}

// 댓글 수정 페이지로 이동
async function commentupdatesubmit(commentId, articleId){
    console.log(commentId)
    console.log(articleId)
    
    window.location.href = `${frontend_base_url}/comment_update.html?article_id=${articleId}&comment_id=${commentId}`
}

// 댓글 삭제 기능

async function commentdelete(commentId) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // const commentId = urlParams.get('comment_id');
    console.log(queryString)
    const articleId = urlParams.get('article_id');
    console.log(commentId)
    console.log(articleId)
    const token = localStorage.getItem("access");
    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.status == 204) {
        alert("댓글 삭제 완료!");
        window.location.replace(`${frontend_base_url}/article_detail.html?article_id=${articleId}`);
    } else {
        alert("권한이 없습니다.",response.status);
    }
}





async function loadArticles(articleId){
    const response=await getArticle(articleId);

    const articleUser=document.getElementById("article-user")
    const articleTitle=document.getElementById("article-title")
    const articleImage=document.getElementById("article-image")
    const articleContent=document.getElementById("article-content")

    articleUser.innerText = response.user
    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    const newImage = document.createElement("img")

    if (response.image){
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://geojecci.korcham.net/images/no-image01.gif")
    }

    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)
}

window.onload = async function(){
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)

    await loadArticles(articleId);
    await loadComments(articleId);
}




// 수정하기로 이동하는 버튼
async function updateBtn() {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)
    window.location.href = `${frontend_base_url}/article_update.html?article_id=${articleId}`
}



// 글 삭제
async function deleteArticle(){
    const response = await handleDeleteArticle(articleId)
    console.log(response)
}


// async function Articlecommentupdate(){
//     const response = await Comment_updatesubmit(articleId)
//     console.log(response)
// }