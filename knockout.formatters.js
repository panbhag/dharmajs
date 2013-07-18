/* A library to add date, nuber, string formatters to knockout
   Author: Pankaj Bhageria
   Date: 9th September 2012
   Dependencies: moment.js

*/

ko.bindingHandlers.dateString = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            pattern = ko.utils.unwrapObservable(allBindingsAccessor().pattern) || ko.bindingHandlers.dateString.defaultPattern,
            formattedValue = moment(value).format(pattern);

        ko.bindingHandlers.text.update(element, function () { return formattedValue; });
    },
    defaultPattern: "dddd, MMM Do YYYY"
};


ko.bindingHandlers.wallText = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
        formattedValue = emoticonize.replace(value);
        formattedValue = urlize(formattedValue, App.urlizeOptions);
        formattedValue = formattedValue.replace(/\n/g, '<br />');
        ko.bindingHandlers.html.update(element, function () { return formattedValue; });
    }

}
