module.exports = function () {
    $(document).ready(function () {

        // here's some magic to make sure the dates are happening this month.
        moment.locale('fr', {
            months: "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_")
        });
        moment().locale('ru').format('YYYY-MM');
        var events = $('.calendar__body').data('checked-date');

        var eventArray = []
        events && events.split(',').map(function (item) {
            eventArray.push({
               date: item
           });
        });

        var calendar = $('.calendar__body').clndr({
           template: $('#template-calendar').html(),
           events: eventArray,
            weekOffset: 1,
           startWithMonth: moment().add('month', 0),
           daysOfTheWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
           clickEvents: {
             click: function(target) {
                 if (!target.events.length) {
                     return;
                 }
                 $('.calendar__body').trigger('change', {
                     date: target.date['_i']
                 });
             }
           }
         });
    });
}
