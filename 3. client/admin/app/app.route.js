app
    .run(['Session', 'Router', 'Login',
        function (Session, Router, Login) {

            /**
             * Session Initialize, Set session fields
             */
            Session.initialize(['userID', 'userState']);

            /**
             * Authentication Router Settings
             */
            Router.security(Login.isLogined, 'login');

        }
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            /**
             * Cors Settings
             * @type {boolean}
             */
            $httpProvider.defaults.withCredentials = true;

            /**
             * Route Settings
             */
            $stateProvider

                .state('login', {
                    url: '/login',
                    views: {
                        'mainContainer@': {
                            templateUrl: './app/page/login/loginView.html',
                            controller: 'LoginCtrl as ctrl'
                        }
                    }
                })

                .state('container', {
                    url: '',
                    authenticate: true,
                    views: {
                        'mainContainer@': {
                            templateUrl: './app/page/container.html'
                        }
                    }
                })

                .state('container.dashboard', {
                    url: '/dashboard',
                    authenticate: true,
                    views: {
                        'menuContentsContainer': {
                            templateUrl: './app/page/dashboard/dashboardView.html',
                            controller: 'DashboardCtrl as ctrl'
                        }
                    }
                })

                .state('container.homepage', {
                    url: '/homepage',
                    abstract: true,
                    authenticate: true,
                    views: {
                        'menuContentsContainer': {
                            templateUrl: './app/page/homepage/homepageContainer.html',
                            controller: 'BoardListCtrl as ctrl'
                        }
                    }
                })

                .state('container.homepage.board', {
                    url: '/board',
                    abtract: true,
                    authenticate: true,
                    views: {
                        'contentsContainer': {
                            templateUrl: './app/page/homepage/board/container.html'
                        }
                    }
                })

                .state('container.homepage.board.list', {
                    url: '/list/:pageNumber',
                    authenticate: true,
                    views: {
                        'boardContainer': {
                            templateUrl: './app/page/homepage/board/list/listView.html',
                            controller: 'BoardListCtrl as ctrl'
                        }
                    }
                })

                .state('container.homepage.board.detail', {
                    url: '/detail/:articleID',
                    authenticate: true,
                    views: {
                        'boardContainer': {
                            templateUrl: './app/page/homepage/board/detail/detailView.html',
                            controller: 'BoardDetailCtrl as ctrl'
                        }
                    }
                })

                .state('container.homepage.board.write', {
                    url: '/write',
                    authenticate: true,
                    views: {
                        'boardContainer': {
                            templateUrl: './app/page/homepage/board/write/writeView.html',
                            controller: 'BoardWriteCtrl as ctrl'
                        }
                    }
                })
                .state('container.homepage.board.modify', {
                    url: '/modify/:articleID',
                    authenticate: true,
                    views: {
                        'boardContainer': {
                            templateUrl: './app/page/homepage/board/modify/modifyView.html',
                            controller: 'BoardModifyCtrl as ctrl'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/dashboard');
        }])