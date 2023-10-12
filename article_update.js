async function updatesubmit(){
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)

    const updatedTitle = document.getElementById("title").value;
    const updatedContent = document.getElementById("content").value;
    const image = document.getElementById("image").files[0]
    console.log(updatedTitle)
    console.log(updatedContent)

    const formdata = new FormData();

    formdata.append('title', updatedTitle)
    formdata.append('content', updatedContent)
    formdata.append('image', image)

    let token = localStorage.getItem("access")

    const response = await fetch (`${backend_base_url}/articles/${articleId}/`,{
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )


    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${articleId}`
}




// async function updateArticle(){
//     console.log(articleId)
//      // 1. 게시글 내용 가져오기
//      const updatedTitle = document.getElementById("updated-title");
//      const updatedContent = document.getElementById("updated-content");
 
//      // 2. 수정된 내용으로 게시글 업데이트
//      const response = await fetch(`${backend_base_url}/articles/${articleId}/`, {
//          method: 'PUT', 
//          headers: {
//              'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({
//              title: updatedTitle,
//              content: updatedContent,
//          }),
//      });
 
//      if (response.status === 200) {
//          // 업데이트가 성공
//          console.log("게시글이 업데이트되었습니다.");
//          window.location.href = `${frontend_base_url}/`;
//      } else {
//          // 업데이트가 실패
//          console.error("게시글 업데이트 중 오류 발생.");
//      }

// }