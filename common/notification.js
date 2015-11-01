/**
 * Создает соощение
 * @param {String} type
 * @param {String} text
 */
window.createNotification = function(type, text) {
    type = type || '';
    text = text ? text : type;
    text = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

    var notification = $('<div class="notification-list__item ' + type + '">' + text + '</div>')
    var list = $('.notification-list');

    if (list.length === 0) {
        list = $('<div class="notification-list">');
        $('body').append(list);
    }

    list.prepend(notification);


    setTimeout(function () {
        notification.addClass('visible');
    }, 0);

    var id = setTimeout(removeNotification.bind(null, notification), 5000);

    notification.click(function () {
        removeNotification($(this));
        clearTimeout(id);
    });

}

function removeNotification (item) {
    item.removeClass('visible');

    setTimeout(function () {
        item.remove();
    }, 350);
}
