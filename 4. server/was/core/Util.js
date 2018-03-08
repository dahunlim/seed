module.exports = {
    getCharacterSet: function(res){
        var contentType = res.headers['content-type'];
        var regexPattern = /charset=[a-z0-9-_]+/i;
        var rs = regexPattern.exec(contentType);
        return (rs != null) ? rs[0].split('=')[1] : 'UTF-8';
    },

    urlCorrection: function(url){
        var regexPattern = /^(http[s]?)/i;
        if(!regexPattern.test(url)){
            url = "http://"+url;
        }
        return url;
    },

    extractNumber: function(str){
        var returnStr = '';
        for(var i = 0; i < str.length; i++){
            const charCode = str.charCodeAt(i);
            if(charCode >= 48 && charCode <= 57){
                returnStr += str.charAt(i);
            }
        }
        return (returnStr.length > 0)? returnStr : null;
    },

    ageToBirth: function(age){
        return (new Date().getFullYear()-age+1);
    },

    birthToAge: function(birth){
        return (new Date().getFullYear()-birth+1);
    },

    tagTrim: function(str){
        var newline = /\r?\n|\r/g, tags = /(<([^>]+)>)/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, ltrim = /^\s+/g, rtrim =  /\s+$/g, specialChar = /&#?[a-z0-9]+;/g, leftAngleBraket = /\\x3c/g, rightAngleBraket = /\\x3e/g;
        return str.replace(commentsAndPhpTags, '').replace(tags, '').replace(rtrim, '').replace(ltrim, '').replace(specialChar, '').replace(leftAngleBraket, '').replace(rightAngleBraket, '').replace(newline, '');
    },

    replaceAll: function(str, find, replace){
        return str.toString().split(find).join(replace);
    },

    createRandomCode: function(len){
        var min = Math.pow(10, len -1);
        var max = Math.pow(10, len) - 1;
        return Math.floor(Math.random() * (max - min)) + min;
    }
}