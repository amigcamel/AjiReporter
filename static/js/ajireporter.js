angular.module('DVReporterApp', ['textAngular', 'angularFileUpload'])

// .config(['$routeProvider', function($routeProvider) {
// 	$routeProvider
// 		.when('/', {

// 		})
// }])

.controller('BaseCtrl', ['$scope', 'FileUploader', '$http', function($scope, FileUploader, $http) {
	$scope.htmlVariable = '<h1 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><b><span lang="EN-US">2016.02.01</span><span>網路輿情摘</span><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><span>要<span lang="EN-US"></span></span></b></h1><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span lang="EN-US">1.</span><span>【各局處】：</span><span>拆忠孝橋引道<span lang="EN-US">2</span>萬多人塞<span lang="EN-US">12</span>分鐘<span lang="EN-US"></span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><b><u><span>社群論壇</span></u></b><span>評價：無相關討論<span lang="EN-US"></span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><b><u><span>新聞網站</span></u></b><span>評價：負評<span lang="EN-US">9</span>＞正評<span lang="EN-US">2</span>（蘋果日報）<span lang="EN-US"></span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><span>網友留言：<span lang="EN-US">(</span>摘要均全文轉貼網友留言<span lang="EN-US">)</span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><span>正評摘要：該拆就要拆<span lang="EN-US"></span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span>負評摘要：</span><span>沒有建設 只會拆除<span lang="EN-US"></span></span></h4><h4 style="color: rgb(85, 85, 85);text-align: center;background-color: rgb(255, 255, 255);"><span>以上報告長官</span></h4>';
    $scope.uploader = new FileUploader({
    	url: '/uploader/'
    });    

    $scope.hour = 3;
    $scope.minute = 30;
    $scope.recipients = [
    	'amigcamel@gmail.com',
    	// 'aji@dailyview.tw',
    	// 'amigcamelowen2@yahoo.com.tw',
    	// 'ajiliu@mt2015.com',
    	// 'ami_g_camel@hotmail.com'
    ];

    $scope.sendTest = function() {
    	var mail = {
    		subject: $scope.subject,
    		recipients: $scope.recipients,
    		content: $scope.htmlVariable,
    	};
    	$http({
    		url: '/sendmail/',
    		method: 'POST',
    		data: mail,
    		headers: {
	    		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'	
    		}
    	});
    	console.log(mail);
    };

    // $scope.test = function() {
    // 	console.log($scope.uploader);
    // };

}])