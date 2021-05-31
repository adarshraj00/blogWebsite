function f(form){
    var x=document.getElementById("pass").value ;
    var y=document.getElementById("pass1").value;
    if(x==y){ 
        form.action='/';
        form.method='post';
    }
    else{
        form.action='/signup';
        form.method='get';
    }
}