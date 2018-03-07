controller
    .controller('BoardListCtrl', ['$scope', 'Board', 'Response', '$stateParams', function($scope, Board, Response, $stateParams){
        var _this = this;
        _this.isSlideBtn = true;

        _this.slideBtnClick = function(){
            _this.isSlideBtn = !_this.isSlideBtn;
        }
        /**
         * Page Object
         * @type {{number: number, count: number}}
         */
        _this.page = {
            number: (typeof $stateParams.pageNumber === 'undefined' || $stateParams.pageNumber.length == 0)? 1 : Number($stateParams.pageNumber),
            count: 15,
            keyword: '',
            articles: []
        }
        _this.page.offset = (_this.page.number - 1) * _this.page.count;

        /**
         * More Function
         */
        _this.load = function(){
            Board.list(_this.page.keyword, _this.page.offset, _this.page.count).then(function(rs){
                _this.page.articles = rs.data;
            }, Response.networkError);
        }
        _this.load();
    }]);