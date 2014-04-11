/**
 * Created by Heorhi_Vilkitski on 3/28/14.
 */

myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/cumulative");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/cumulative",
            templateUrl: "pages/cumulative.html"
        })
        .state('weeklyVelocity', {
            url: "/weeklyVelocity",
            templateUrl: "pages/weeklyVelocity.html"
        })
        .state('pagesBySize', {
            url: "/pagesBySize",
            templateUrl: "pages/pagesBySize.html"
        })
        .state('progressTable', {
            url: "/progressTable",
            templateUrl: "pages/progressTable.html"
        })
        .state('timeSheet', {
            url: "/timeSheet",
            templateUrl: "pages/timeSheet.html"
        })
        .state('updateFromJira', {
            url: "/updateFromJira",
            templateUrl: "pages/updateFromJira.html"
        })
        .state('page' , {
            url: "/page/:id",
            templateUrl: "pages/page.html"
        })
});