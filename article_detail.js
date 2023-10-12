let articleId
console.log("디테일 js 로드")

async function loadComments(articleId){
    const response = await getComments(articleId);
    console.log(response)

    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""
    response.forEach(comment =>{
        // 프로필사진 업로드하면 src 링크 바꿔주세요
        commentList.innerHTML += `
        <li class="media d-flex">
        <img class="mr-3" src="https://i.namu.wiki/i/aAjVJcFK3NRRIt5Ef32SxP6r8Hpl1F_EFl6anZAzO_4shH3IM7fsB8BVnTwd8rJy1rzAXU4xW37zmTsGbxaWwEkn4qr3K-ZCcnObSHw4qF57dl5pKNUjDOTJSFwvMw3RhVehfZ0coU-0JEr7r7moDg.webp" alt="프로필이미지" width="50" height "50">
        <div class="media-body">
          <h5 class="mt-0 mb-1">${comment.user}</h5>
          ${comment.content}
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


async function loadArticles(articleId){
    const response=await getArticle(articleId);

    const articleTitle=document.getElementById("article-title")
    const articleImage=document.getElementById("article-image")
    const articleContent=document.getElementById("article-content")

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