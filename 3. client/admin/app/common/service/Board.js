service
    .factory('Board', ['Request', function(Request){
        return{
            list: function(keyword, offset, count){
                var paramObj = { offset: offset, count: count };
                if(keyword && keyword.length > 0){
                    paramObj.keyword = keyword;
                }
                return Request.send('GET', '/board/list', paramObj);
            },

            get: function(id){
                return Request.send('GET', '/board/get', {articleID: id});
            },

            insert: function(title, contents, image){
                var paramObj = {title: title, contents: contents};
                if(image){
                    paramObj.image = image;
                }
                return Request.send('POST', '/board/insert', paramObj);
            },

            modify: function(articleID, title, contents, image){
                var paramObj = {articleID: articleID, title: title, contents: contents};
                if(image){
                    paramObj.image = image;
                }
                return Request.send('POST', '/board/modify', paramObj);
            },

            delete: function(id){
                return Request.send('GET', '/board/delete', {articleID: id});
            }
        }
    }])