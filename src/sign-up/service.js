const BaseUrl = "http://localhost:9500/";
class AuthService{
    InsertNewUser(x){
        
        return fetch(BaseUrl + "InsertNewUser", {
            "method":"POST",
            "mode":"cors",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(x)
        }).then(x => {
            
            return x.ok;
        });
    }
    SendEmail(x){
    
        const queryParams = { to : x.username, password : x.password};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
        return fetch(BaseUrl + `sendEmail?${queryString}`, {
            "method":"GET",
            "mode":"cors",
        }).then(x=> x.text()).then(reslut=> {
            return reslut
        });
    }

    ForgotPassword(x){
    
        const queryParams = { to : x.name};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
        return fetch(BaseUrl + `forgotPassword?${queryString}`, {
            "method":"GET",
            "mode":"cors",
        }).then(x=> x.text()).then(reslut=> {
            return reslut
        });
    }
    
    async otpVerification(x,otp){
        const queryParams = { to : x.name, otp : otp};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
        const x_1 = await fetch(BaseUrl + `Verification?${queryString}`, {
            "method": "GET",
            "mode": "cors",
        });
        const reslut = await x_1.json();
        ;
        return reslut;
    }

    async otpReVerification(x,otp){
        const queryParams = { to : x.name, otp : otp};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
        const x_1 = await fetch(BaseUrl + `reVerification?${queryString}`, {
            "method": "GET",
            "mode": "cors",
        });
        const reslut = await x_1.json();
        ;
        return reslut;
    }

    PersonValidation(x){
        const queryParams = { to : x.username};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
       return fetch(BaseUrl + `Personvalidation?${queryString}`, {
            "method":"GET",
            "mode":"cors",
        }).then(x=> x.json()).then(reslut=> {
            
            return reslut
        });
    }
    AllowUserLogin(x){
        const queryParams = { to : x.name, password: x.password};
        const queryString = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&');
       return fetch(BaseUrl + `Allowuserlogin?${queryString}`, {
            "method":"GET",
            "mode":"cors",
        }).then(x=> x.text()).then(reslut=> {
            
            return reslut
        });
    }
    updatePassword(x, password){
        const queryParams = { name : x.name, password: password};
        const queryString = Object.keys(queryParams)
        .map((key) => key + '=' + queryParams[key])
        .join('&');
        return fetch(BaseUrl + `Updatepassword?${queryString}`, {
            "method":"GET",
            "mode":"cors",
        }).then(x=> x.text()).then(reslut=> {
            
            return reslut
        });
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();