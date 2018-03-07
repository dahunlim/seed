controller
    .controller('LoginCtrl', ['Login', 'Response', 'Router', function(Login, Response, Router){
        var _this = this;

        /**
         * User Object
         */
        _this.user = {
            id: '',
            pass: ''
        }

        _this.login = function(){
            if(_this.user.id.length != 0 && _this.user.pass.length != 0){
                Login.email(_this.user.id, _this.user.pass).then(function(rs){
                    if(rs.code == Response.code.SUCCESS){
                        Router.go('container.dashboard');
                    }else{
                        alert('Login Fail');
                    }
                }, Response.networkError);
            }else{
                alert('Input Login Information');
            }
        }
    }]);