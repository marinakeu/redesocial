$(document).ready(function () {
    $('#btn-sign-up').click(getSignUpInfo);
    $('#btn-sign-in').click(getSignInInfo);
    $('#post-btn').click(getPostInput);
    $('#home-btn-sign-in').click(goSignIn);
    $('#home-btn-sign-up').click(goSignUp);
    $("#btn-search-users").click(getSearchUsers);
});

function goSignIn(event) {
    event.preventDefault()
    window.location = 'signIn.html'
}

function goSignUp(event) {
    event.preventDefault()
    window.location = 'signUp.html'
}

function getSignUpInfo(event) {
    event.preventDefault()
    const email = $('#email').val();
    const password = $('#password').val();
    const name = $('#name').val();
    const lastName = $('#last-name').val();
    signUp(email, password, name, lastName);
}

function getSignInInfo(event) {
    event.preventDefault()
    const emailSignIn = $('#email-sign-in').val();
    const passwordSignIn = $('#password-sign-in').val();
    signIn(emailSignIn, passwordSignIn);
}

function getPostInput(event) {
    event.preventDefault();
    let postInput = $('#post-input').val();
    let privacyInput = $('#privacy-post').val();
    if (postInput) {
        let newPost = addPostsToDB(postInput, privacyInput);
        let postId = newPost.getKey();
        console.log(postId);
        printPosts(postInput, 0, privacyInput, postId);
    } else {
        alert("complete");
    }
    $("#post-input").val("");
}




function printPosts(text, like, privacy, key) {
    let likes = "";
    let printPrivacy = "";
    if (like > 0) {
        likes = like;
    }
    if (privacy === "public-post") {
        printPrivacy = "Público";
        filter = "public"
    } else {
        printPrivacy = "Privado";
        filter = "private"
    }
    $("#post-list").prepend(`
        <div class="${filter}" id='post-container-${key}'>
        <p>${printPrivacy}</p>
            <div id='div-${key}' class="wrap-menu">
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div id='options-${key}'>
                    <ul>
                        <li id=edit-${key}>Editar</li>
                        <li id=del-${key}>Deletar</li>
                    </ul>
                </div>
            </div>    
            <p id=text-${key}>${text}</p>
            <i class="far fa-heart" id="heart-${key}"></i>
            <p id="likes-${key}">${likes}</p>
            <p>_____________</p>
        </div>`
    );

    if (like > 0) {
        $(`#heart-${key}`).removeClass('far').addClass('fas');
    };

    getChangeOp(text, key);
    likePost(likes, key);
}

function getChangeOp(text, key) {
    $(`#options-${key}`).hide()
    $(`#div-${key}`).click(function () {
        $(`#options-${key}`).toggle("display")
    });
    $(`#edit-${key}`).click(function () {
        console.log(key);
        let newText = prompt(`Altere sua publicação: ${text}`);
        let postP = $(`#text-${key}`);
        editPost(postP, newText, key);
    });
    $(`#del-${key}`).click(function () {
        console.log(key);
        if (window.confirm("Excluir publicação?")) {
            let postContainer = $(`#post-container-${key}`);
            deletePost(postContainer, key);
        }
    });
}

function likePost(likes, key) {
    $(`#heart-${key}`).click(function () {
        if (likes > 0) {
            likes = parseInt(likes);
        }
        likes += 1;
        $(`#likes-${key}`).html(likes);
        if (likes > 0) {
            $(`#heart-${key}`).removeClass('far').addClass('fas');
        };
        addLikesToDB(likes, key);
    })
}

$('#privacy-filter').change(function(){
    let choice = $('#privacy-filter option:selected').text();
    if(choice === 'Todos'){
        $('.private').show()
        $('.public').show() 
    } else if (choice === 'Privado') {
        $('.public').hide() 
        $('.private').show() 
    } else if (choice === 'Público') {
        $('.private').hide()
        $('.public').show() 
    }
});

function getSearchUsers(event) {
    event.preventDefault();
    let searchInput = $('#search-input').val();
    // window.location = 'search.html?userId=' + USER_ID;
    console.log('oi');
    getUsersFromDB(searchInput);    
}

function printUsers(userArray) {
    console.log(userArray);
    $('#users-list').prepend(`
    <h3>${userArray[0]} ${userArray[1]}</h3>
    <p>${userArray[2]}</p>
    `
    );
    // window.location = 'search.html?userId=' + USER_ID;
}