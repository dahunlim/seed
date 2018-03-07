controller
    .controller('BoardDetailCtrl', ['$stateParams', 'Board', 'Response', 'Router', function($stateParams, Board, Response, Router){
        var _this = this;
        Board.get($stateParams.articleID).then(function(rs){
            switch(rs.code){
                case Response.code.SUCCESS:
                    _this.article = rs.data;
                    break;
                default:
                    alert(rs.msg);
                    Router.back();

            }
        }, Response.networkError);

        _this.list = function(){
            Router.go('container.homepage.board.list', {pageNumber: $stateParams.pageNumber});
        }

        _this.modify = function(){
            Router.go('container.homepage.board.modify', {articleID: $stateParams.articleID});
        }

        _this.delete = function(){
            Board.delete($stateParams.articleID).then(function(rs){
                if(rs.code == Response.code.SUCCESS){
                    Router.go('container.homepage.board.list', {})
                }else{
                    alert(rs.msg);
                }
            }, Response.networkError);
        }
    }]);