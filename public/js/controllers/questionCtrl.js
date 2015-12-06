/**
 * Created by Ido on 04/12/2015.
 */


controller('AddImageController', ['$scope', 'Upload', '$modalInstance', '$timeout',
    function ($scope, Upload, $modalInstance, $timeout) {
        //$scope.poster = {};
        //$scope.poster.authors = [];
        //$scope.poster.slides = [];
        $scope.images = [];
        //$scope.dynamic = 50;

        //$scope.showAuthors = true;

        //$scope.add_author = function () {
        //    $scope.poster.title = $scope.title;
        //
        //    var author = {
        //        fname: $scope.fname,
        //        lname: $scope.lname,
        //        title: $scope.atitle
        //    };
        //
        //    $scope.poster.authors.push(author);
        //
        //    $scope.fname = '';
        //    $scope.lname = '';
        //    $scope.atitle = '';
        //};

        //$scope.remove_author = function (author) {
        //    for (var i = 0; i < $scope.poster.authors.length; i++) {
        //        if (author === $scope.poster.authors[i])
        //            $scope.poster.authors.splice(i, 1);
        //    }
        //};

        //$scope.add = function () {
        //    alert('closing modal and returning poster: ' + JSON.stringify($scope.poster));
        //    $modalInstance.close($scope.poster);
        //};

        //$scope.remove_slide = function (slide) {
        //    for (var i = 0; i < $scope.poster.slides.length; i++) {
        //        if ($scope.poster.slides[i] === slide)
        //            $scope.poster.slides.splice(i, 1);
        //    }
        //};

        //$scope.change_slide_order = function (oldorder, amount) {
        //    var neworder = parseInt(oldorder + amount);
        //    oldorder = parseInt(oldorder);
        //
        //    //we won't swap indices, but
        //    if (neworder >= 0 && neworder < $scope.poster.slides.length) {
        //        var slide1 = -1;
        //        var slide2 = -2;
        //
        //        for (var i = 0; i < $scope.poster.slides.length; i++) {
        //            if ($scope.poster.slides[i].order === oldorder)
        //                slide1 = i;
        //            else if ($scope.poster.slides[i].order === neworder)
        //                slide2 = i;
        //        }
        //
        //        //swap the slides, not the index, but the order value
        //        $scope.poster.slides[slide1].order = neworder;
        //        $scope.poster.slides[slide2].order = oldorder;
        //    }
        //};

        //handle slide uploads
        $scope.add_images = function (event) {

            var files = $scope.files = event.target.files;


            for (var i = 0; i < files.length; i++) {
                var reader = new FileReader();

                var file = files[i];
                reader.onload = $scope.imageLoaded;
                reader.readAsDataURL(file);
            }
        };

        $scope.imageLoaded = function (e) {
            //timeout should solve the $digest error
            //safer than $apply
            $timeout(function () {
                var data = e.target.result;

                //data = window.btoa(data);

            //    var order = $scope.poster.slides.length;

                //build a JSON slide object
                var img = {
                    image: data
              //      order: order
                };

                //add the image to the poster
           //     $scope.poster.slides.push(slide);
                $scope.images.push(img);
            });
        };
    }
]);