

// async function Comment_updatesubmit(commentId, articleId){
//     const urlParams = new URLSearchParams(window.location.search);
//     const articleId = urlParams.get('article_id');
//     console.log(articleId)
//     console.log(commentId)

//     const updatedContent = document.getElementById("commentcontent").value;

//     console.log(updatedContent)

//     const formdata = new FormData();

//     formdata.append('commentcontent', updatedContent)

//     let token = localStorage.getItem("access")

//     const response = await fetch (`${backend_base_url}/articles/${articleId}/comment/${commentId}/`,{
//         method: 'PUT',
//         headers: {
//             "Authorization": `Bearer ${token}`
//         },
//         body: formdata
//     }
//     )

    
//     // window.location.href = `${frontend_base_url}/article_detail.html?article_id=${articleId}/`
// }



