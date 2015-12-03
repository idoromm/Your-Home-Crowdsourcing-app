
function raiseAlert() {
    sweetAlert("Thank you!", "This listing has been reported", "success");
}
(function () {
    setTimeout(function () {
        sweetAlert({
                title: "Is this room furnished?",
                imageUrl: "images/ss1.jpg",
                imageSize: '500x500',
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonColor: "#00ff00", // green
                confirmButtonText: "Yes",
                closeOnConfirm: false
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