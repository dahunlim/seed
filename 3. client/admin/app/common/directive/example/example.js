directive
    .directive('directiveExample', [function(){
        return{
            restrict: "A",
            template: '<div>hello</div>',
            link: function(scope, element, attrs){
                console.log('example directive call!');
            }
        }
    }])