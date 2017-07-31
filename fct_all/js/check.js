/**
 * Created by Admin on 2017/7/10.
 */
//验证用户名
function checkRole(val,id){
    var user_name_checkcode = /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9]){7,17}$/;
    if(!user_name_checkcode.test(val)){
        document.getElementById(id).setAttribute("style","display:block;color:red");
        document.getElementById(id).innerHTML="格式不正确！用户名由数字、字母组成，长度为8-18位。且不能为数字开头";
        return false;
    }else{
        document.getElementById(id).setAttribute("style","display:block;color:green");
        document.getElementById(id).innerHTML="正确";
        return true;
    }
}
//验证手机号码
function checkPhone(val,id){
    var reg_phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if(!reg_phone.test(val)){
        document.getElementById(id).setAttribute("style","display:block;color:red");
        document.getElementById(id).innerHTML="请输入正确的手机号码";
        return false;
    }else{
        document.getElementById(id).setAttribute("style","display:block;color:green");
        document.getElementById(id).innerHTML="正确";
        return true;
    }
}
//验证密码
function checkPassword(val,id){
    var user_name_checkcode = /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9]){7,17}$/;
    var userName = document.getElementById("userName").value;
    if(!user_name_checkcode.test(val)){
        document.getElementById(id).setAttribute("style","display:block;color:red");
        document.getElementById(id).innerHTML="格式不正确！密码名由数字、字母组成，长度为8-18位。且不能为数字开头";
        return false;
    }else if(val==userName){
        document.getElementById(id).setAttribute("style","display:block;color:red");
        document.getElementById(id).innerHTML="用户名和密码不能一样";
        return false;
    }else{
        document.getElementById(id).setAttribute("style","display:block;color:green");
        document.getElementById(id).innerHTML="正确";
        return true;
    }
}

function checkPasswordRes(val,id){
    var role_password = document.getElementById("role_password").value;
    var user_name_checkcode = /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9]){7,17}$/;


        if(val!=role_password){
            document.getElementById(id).setAttribute("style","display:block;color:red");
            document.getElementById(id).innerHTML="两次输入的密码不一样";
            return false
        }else{
            document.getElementById(id).setAttribute("style","display:block;color:green");
            document.getElementById(id).innerHTML="正确";
            return true;
        }

}

