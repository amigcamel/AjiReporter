angular.module('DVReporterApp', ['textAngular', 'angularFileUpload'])

// .config(['$routeProvider', function($routeProvider) {
// 	$routeProvider
// 		.when('/', {

// 		})
// }])

.controller('BaseCtrl', ['$scope', 'FileUploader', '$http', function($scope, FileUploader, $http) {
    $scope.settings = {};
    $scope.settings.htmlVariable = '<h1 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><b><span lang="EN-US">'
    $scope.settings.htmlVariable += new Date().toJSON().replace(/-/gi, '.').split('T')[0]
    $scope.settings.htmlVariable += '</span><span>網路輿情摘</span><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><span>要<span lang="EN-US"></span></span></b></h1><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span lang="EN-US">1.</span><span>【     】：</span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><b><u><span>社群論壇</span></u></b><span>評價：<span lang="EN-US"></span></span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><b><u><span>新聞網站</span></u></b><span>評價：<span lang="EN-US"></span></span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span lang="EN-US">*</span><span>網友留言：<span lang="EN-US">(</span>摘要均全文轉貼網友留言<span lang="EN-US">)</span></span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><a rel="nofollow" style="color: rgb(25, 106, 212);background-color: transparent;"></a><span>正評摘要：<span lang="EN-US"></span></span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span>負評摘要：</span></h4><h4 style="text-align: left;color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);"><span>以上報告長官</span></h4>'
    $scope.settings.uploader = new FileUploader({
        url: '/uploader/'
    });
    $scope.initUploader = function() {
        $scope.settings.uploader = new FileUploader({
            url: '/uploader/'
        });
    }

    $scope.settings.subject = new Date().toJSON().replace('T', '-').split('-').slice(1,3).join('')+'新北市網路輿情日報表'
    $scope.settings.hour = 3;
    $scope.settings.minute = 30;
    $scope.settings.recipients = [];

    $scope.recipientsEdit = $scope.settings.recipients.join(',\n');
    $scope.saveRecipients = function() {
        $scope.settings.recipients = $scope.recipientsEdit.replace(/\n/gi, '').replace(/,$/gi, '').split(',');
    };

    $scope.sendTest = function() {
    	var mail = {
    		subject: $scope.settings.subject,
    		recipients: $scope.settings.recipients,
    		content: $scope.settings.htmlVariable,
            attachment: $scope.settings.uploader.queue.map(function(item) {return item.file.name})
    	};
    	$http({
    		url: '/send_test/',
    		method: 'POST',
    		data: mail,
    		headers: {
	    		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'	
    		}
    	});
    	console.log(mail);
    };

    $scope.genCron = function() {
        var kw = {
            subject: $scope.settings.subject,
            recipients: $scope.settings.recipients,
            content: $scope.settings.htmlVariable,
            attachment: $scope.settings.uploader.queue.map(function(item) {return item.file.name}),
            hour: $scope.settings.hour,
            minute: $scope.settings.minute
        };

        $http({
            url: '/view_gen_cron/',
            method: 'POST',
            data: kw,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
            }
        });

        
    };

    $scope.saveSettings = function() {

        // settings
        var ks = ['subject','recipients','htmlVariable','hour','minute'];
        var settings = {};
        angular.forEach(ks, function(k) {
            settings[k] = $scope.settings[k]
        });

        // uploader queue
        settings.uploaderQueue = [];
        if ($scope.settings.uploader.queue) {
            var ks = ['file', 'progress', 'isSuccess', 'isCancel', 'isError', 'isReady', 'isUploading', 'isSuccess', 'isUploading'];

        	$scope.settings.uploader.queue.map(function(item) {
                var _item = {};
                angular.forEach(ks, function(k) {
                    _item[k] = item[k];
                });
                settings.uploaderQueue.push(_item);
            });            
        }

        $http({
            url: '/crud_settings/',
            method: 'POST',
            data: settings,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
            }
        });

    };

    $scope.loadSettings = function() {
        $http.get('/crud_settings')
            .then(function(resp) {
                var settings = resp.data;
                if (settings != 'nodata') {
                    // settings
                    var ks = ['subject','recipients','htmlVariable','hour','minute'];
                    angular.forEach(ks, function(k) {
                        $scope.settings[k] = settings[k];
                    });
                    // uploader
                    if (settings.uploaderQueue) {
                        $scope.settings.uploader.queue = settings.uploaderQueue;
                        // add remove function for each item

                        angular.forEach($scope.settings.uploader.queue, function(item, idx) {
                            item.remove = function() {
                                $scope._removeQueue(item.file.name);

                            }
                        });
                    }
                };
            })
    };

    $scope._removeQueue = function(filename) {
        angular.forEach($scope.settings.uploader.queue, function(item, idx) {
            if (item.file.name == filename) {
                $scope.settings.uploader.queue.splice(idx, 1);
                return false
            }
        })
    };

    $scope.deleteSettings = function() {
        $http.delete('/crud_settings');
        window.location.reload();
    };

    $scope.loadSettings();

}])
