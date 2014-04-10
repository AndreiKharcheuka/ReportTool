/**
 * Created with JetBrains WebStorm.
 * User: Gerd
 * Date: 06.03.14
 * Time: 21:51
 * To change this template use File | Settings | File Templates.
 */
function progressTableController($scope, $resource, $window) {
    var progressSeriesResource = $resource('/progressdata');

    /* ------------------------------------------------------ Init/Reinit -------------------------------*/
    $scope.init = function () {
        $scope.common = {};

        $scope.dataLoad();
    }

    $scope.reInit = function () {
        $scope.dataLoad();
    }

    $scope.dataLoad = function () {
        $scope.filteredTeam = $scope.allTeams[0].id;
        $scope.showOnlyTotal = false;
        $scope.getReportData();
    }

    /* -------------------------------------------------------Event handlers ------------------------ */
    /* --------------------------------------------- Actions ------------------------------*/
    $scope.getReportData = function () {
        var loadingDfrd = $.Deferred();

        var getProgressSuccess = function (data) {
            _.each(data.dates, function(itemDate){
                _.each(itemDate.teams, function(itemTeam){
                    _.each(itemTeam.pages, function(itemPage){
                        var prognoseEstimateCollection = itemPage.estimated.split("h/");
                        var koef = prognoseEstimateCollection[0]/prognoseEstimateCollection[1];
                        if(koef>=2)
                        {
                            itemPage.isRed = true;
                        }
                        else if(koef>=1.5)
                        {
                            itemPage.isYellow = true;
                        }
                        else if(koef<=0.5)
                        {
                            itemPage.isGreen = true;
                        }
                        itemPage.isDone = false;
                        if(itemPage.sumprogress == itemPage.storypoints) {
                            itemPage.isDone = true;
                        }
                    })
                })
            })
            $scope.progressData = data;
            loadingDfrd.resolve();
        };

        var getChartFail = function (err) {
            $scope.errMessage = err;
            loadingDfrd.reject(err);
        };

        progressSeriesResource.get(getProgressSuccess, getChartFail)
    }

    /* ------------------------------------------- DOM/Angular events --------------------------------------*/
    $scope.searchIssues = function () {
        $scope.reInit();
    }

    /* ----------------------------------------- Helpers/Angular Filters and etc-----------------------------------*/

    $scope.teamFilter = function(dataItem){
        if($scope.filteredTeam == $scope.allTeams[0].id)
        {
            return true;
        }

        return dataItem.name == $scope.filteredTeam;
    };

    $scope.getSumProgress = function(pages){
        return _.reduce(pages, function(memo, page){ return memo + page.progress; }, 0);
    };

    $scope.getReportMembersMissing = function(team){
        var teamMembers = _.find($scope.TeamDevMembers, function(teamDevMembersItem){
            return teamDevMembersItem.name === team.name
        });

        if(_.isUndefined(teamMembers)){
            return "";
        }
        var missedMembers = "<strong>Work logs missed for:</strong> <br/>";

        _.each(teamMembers.members, function(memberItem){
           var isWorkLogged = _.some(team.pages, function(pageItem){
                return pageItem.person === memberItem.name;
            });

            if(!isWorkLogged){
                missedMembers += memberItem.name + "<br/>"
            }
        });

        return missedMembers;
    };

   $scope.allTeams = function () {
        var allTeamsArray = [{"id": "All", "title": "All"}];
        allTeamsArray.push.apply(allTeamsArray,$scope.jiraLabelsTeams);
        return allTeamsArray;
    }();

    $scope.jiraLabelsTeams = [
        {"id": "TeamNova", "title": "TeamNova"},
        {"id": "TeamRenaissance", "title": "TeamRenaissance"},
        {"id": "TeamInspiration", "title": "TeamInspiration"}
    ];

    $scope.TeamDevMembers = [
        {
            name:"TeamNova",
            members:
                [
                    {name:"Ilya Kazlou1"},
                    {name:"Katsiaryna Kaliukhovich"},
                    {name:"Aliaksandr Nikulin"},
                    {name:"Valentine Zhuck"},
                    {name:"Maryna Furman"},
                    {name:"Vadzim Vysotski"},
                    {name:"Andrei Kandybovich"},
                    {name:"Raman Prakofyeu"},
                    {name:"Aliaksei Labachou"},
                    {name:"Mikita Stalpinski"},
                    {name:"Dzmitry Siamchonak"},
                    {name:"Siarhei Zhalezka"},
                    {name:"Edhar Liashok"},
                    {name:"Ruslan Khilmanovich"},
                ]}
    ];

    $scope.init();
}

