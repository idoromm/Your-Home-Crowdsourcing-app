// navigation slide-in
$(window).load(function () {
    $('.nav_slide_button').click(function () {
        $('.pull').slideToggle();
    });
});
function raiseAlert() {
    swal("Thank you!", "This listing has been reported", "success")
}