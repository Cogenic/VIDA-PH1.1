function getDate() {
    var today = new Date();

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var weekday = today.getDay();
    var month = today.getMonth();
    var day = today.getDate();

    document.getElementById('date').innerHTML = `${weekdays[weekday]} ${months[month]} ${day}`;


    var time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').innerHTML = time;

    var t = setTimeout(getDate, 1000);
}

getDate();
