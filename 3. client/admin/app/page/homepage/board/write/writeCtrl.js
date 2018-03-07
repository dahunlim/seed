controller
    .controller('BoardWriteCtrl', ['$timeout', 'Media', 'Response', 'Board', 'Router', function($timeout, Media, Response, Board, Router){

        var _this = this;

        /**
         * Article Object
         *
         * @type {{title: string, contents: string}}
         */
        _this.article = {
            title: '',
            contents: '',
            image: null
        };

        /**
         * Done Function
         */
        _this.done = function(){
            _this.article.contents = $('#summernote').summernote('code');
            Board.insert(_this.article.title, _this.article.contents, _this.article.image).then(function(rs){
                if(rs.code == Response.code.SUCCESS){
                    Router.go('container.homepage.board.list');
                }else{
                    alert('등록에 실패하였습니다.');
                }
            }, Response.networkError);
        }

        /**
         * Editor Setting
         */
        $timeout(function(){
            // onImageUpload callback
            $('#summernote').summernote({
                height: 400,
                callbacks: {
                    onImageUpload: function(files) {
                        for(var i = 0; i < files.length; i++){
                            (function(file){
                                Media.getSignedUploadUrl().then(function(rs){
                                    var fileObj = rs.data;
                                    Media.uploadToS3(fileObj.url, file).then(function(rs){
                                        var imageNode = document.createElement('img');
                                        imageNode.setAttribute('src', 'https://s3.ap-northeast-2.amazonaws.com/aramin-common/' + fileObj.file);
                                        _this.article.image = fileObj.file;
                                        $('#summernote').summernote('insertNode', imageNode);
                                    }, Response.networkError)

                                }, Response.networkError);
                            }(files[i]));
                        }
                    }
                }
            });
        });
    }]);