let articleId
// 덕영(17강)
console.log("디테일 js 로드")


  


//  호진 (18강)
async function loadComments(articleId){
    const response = await getComments(articleId);
    console.log(response)

    // 19강
    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""
    response.forEach(Comment =>{
        commentList.innerHTML += `
        <li class="media d-flex">
        <img class="mr-3" src="https://i.namu.wiki/i/aAjVJcFK3NRRIt5Ef32SxP6r8Hpl1F_EFl6anZAzO_4shH3IM7fsB8BVnTwd8rJy1rzAXU4xW37zmTsGbxaWwEkn4qr3K-ZCcnObSHw4qF57dl5pKNUjDOTJSFwvMw3RhVehfZ0coU-0JEr7r7moDg.webp" alt="프로필이미지" width="50" height "30">
        <div class="media-body">
          <h5 class="mt-0 mb-1">${comment.user}</h5>
          ${comment.contnet}
        </div>
      </li>
        `
    })

}

// 호진 21강
async function submitComment(){
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    // console.log(newComment)
    // console.log(articleId)
    const response = await postComment(articleId, newComment)
    console.log(response)
    commentElement.value = "" // 댓글 작성후 댓글 작성 칸을 빈공간으로 만들어줌
    
    loadComments(articleId)
}


 


async function loadArticles(articleId){
//  window.onload 에있는거 다 붙여넣기
    const response=await getArticle(articleId);
    console.log(response)
    
    const article = document.querySelector("#article_main");
    const articleTitle=document.getElementById("article-title")
    const articleImage=document.getElementById("article-image")
    const articleContent=document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    const newImage = document.createElement("img")

    if (response.image){
        newImage.setAttribute("src", `${backend_base_url}${article.image}`)
    } else {
        newImage.setAttribute("src", "https://media.istockphoto.com/id/464629385/photo/seoul-skyline.jpg?s=612x612&w=0&0k=20&c")
    }

    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)
}




window.onload = async function(){
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)
    //  위에 3줄 loadarticles에서 중복된부분이라 없애줘야함
    await loadArticles(articleId);
    await loadComments(articleId);



    

}