var Youtube       = require('youtube-video-api')
    , Google        = require('googleapis')
    , Q             = require('q');

module.exports = {
    upload: function(title, description, data){
        var deferred = Q.defer();
        var youtube = Google.youtube('v3');
        var oauth2Client = new Google.auth.OAuth2('451250622165-os95hkbg0ad7gp4kq0c5p2og4pe1po4i.apps.googleusercontent.com', 'SKnhxbZQzE_zlrK_53_Y4PH5')
        oauth2Client.setCredentials({
            "access_token": "ya29.Ci-TA5PqEjGy_hvIl2dIyVH-03k8XmkoVV0WkopfZSdUMZqQm1JYOHVc-lI5KpOStw",
            "token_type": "Bearer",
            "refresh_token": "1/TfxmdlB4LJqDa-VDSBSbrMxGm1rcMkf-rLbHw0boKS4",
            "expiry_date": 1425349408683
        });
        Google.options({auth: oauth2Client});
        youtube.videos.insert({
            part: 'status,snippet',
            resource: {
                snippet: {
                    title: title,
                    description: description
                },
                status: {
                    privacyStatus: 'public' //if you want the video to be private
                }
            },
            media: {
                body: data
            }
        }, function(error, data){
            if(error){
                deferred.reject(error);
            } else {
                deferred.resolve(data.id);
            }
        });
        return deferred.promise;
    }
}
