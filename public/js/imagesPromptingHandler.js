var mongoose = require('mongoose');


function reportListing() {
    sweetAlert("Thank you!", "This listing has been reported", "success");
}

var myPix = new Array("images/ss1.jpg","images/ss2.jpg","images/ss3.jpg");
function choosePic() {
    /* randomly selects a picture of the listing to prompt the user with when he enters */
    var randomNum = Math.floor(Math.random() * myPix.length);
  //  document.getElementById("myPicture").src = myPix[randomNum];
    var picSelected = myPix[randomNum];
    return picSelected;
}

(function () {
    setTimeout(function () {
        sweetAlert({
                title: "Is this room furnished?",
                imageUrl: choosePic(),
                imageSize: '600x600',
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonColor: "#00ff00", // green
                confirmButtonText: "Yes",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count++)
                }
                else {
                    sweetAlert("Thanks!", "Your input will help others", "success");
                    // submitToDatabase(userWhoPerformed, question/listingNumber/count--)
                }
            });
    }, 5000); // 5 seconds

}());