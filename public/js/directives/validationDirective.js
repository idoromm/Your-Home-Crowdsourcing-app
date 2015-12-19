app.directive('showErrors', function () {

    return {
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl) {
            var inputEl = el[0].querySelector("[name]");
            var inputNgEl = angular.element(inputEl);
            var inputName = inputNgEl.attr('name');
            var helpText = angular.element(el[0].querySelector(".help-block"));

            inputNgEl.bind('blur', function () {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
                helpText.toggleClass('hide', formCtrl[inputName].$valid);
            });
            scope.$on('show-errors-event', function(){
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            })
        }
    }
});