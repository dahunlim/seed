service
    .factory('Media', ['Request', '$q', '$http', function(Request, $q, $http){
        return {
            getSignedUploadUrl: function(){
                return Request.send('GET', '/media/getSignedUrl', {});
            },

            uploadToS3: function(url, data){
                var deferred = $q.defer();
                $http({
                    method  : 'PUT',
                    url     : url,
                    data    : data,
                    headers : {
                        'Content-Type' : 'image/jpeg'
                    }
                }).then(function(rs){
                    deferred.resolve(rs);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        }
    }]);