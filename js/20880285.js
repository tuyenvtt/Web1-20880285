const API = 'https://web1-api.herokuapp.com/api';
const AUTHENTICATE_API = 'https://web1-api.herokuapp.com/users';

async function loadData(request, templateId, viewId){
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();
    
    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var context = { data : data };
    var view = document.getElementById(viewId);
    view.innerHTML = template(context);
}

async function getAuthenticateToken(username, password){
    let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    let result = await response.json();
    if (response.status == 200){
        return result.token;
    }
    throw new Error(result.message);
}