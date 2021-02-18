function f(form){
    if(pass1.value!=pass.value){
        form.method='GET';
    form.action='/signup';
    }
    else{
        form.method='POST';
        form.action='/home';
    }
}