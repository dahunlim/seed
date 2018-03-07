service
    .factory('Login', ['Request', function(Request){
        return {
            isLogined: function(){
                return Request.send('GET', '/login/isLogined', {});
            },

            email: function(id, pass){
                return Request.send('POST', '/login/email', {userID: id, userPass: pass});
            }
        }
    }])