async function handleSigninButton(){
    const response = await handleSignin();
    if (response.status == 201){
        alert("회원가입을 축하드립니다.")
        window.location.replace(`${frontend_base_url}/login.html`)
    }
    console.log(response)
}

checkLogin();