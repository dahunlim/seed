controller
    .controller('BoardModifyCtrl', ['$stateParams', '$timeout', 'Board', 'Response', 'Router', function($stateParams, $timeout, Board, Response, Router){
        var _this = this;

        Board.get($stateParams.articleID).then(function(rs){
            if(rs.code == Response.code.SUCCESS){
                _this.article = rs.data;
                _this.article.image = null;
                _this.article.contents = $('#summernote').summernote('code', _this.article.contents);
            }else{
                alert(rs.msg);
                Router.back();
            }
        }, Response.networkError);

        _this.modify = function(){
            _this.article.contents = $('#summernote').summernote('code');
            Board.modify(_this.article._id, _this.article.title, _this.article.contents, _this.article.image).then(function(rs){
                if(rs.code == Response.code.SUCCESS){
                    Router.back();
                }else{
                    alert(rs.msg);
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