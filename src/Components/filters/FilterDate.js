Vue.filter('date', function (value, format) {
    if(value){
        var date = new Date(value);
        var mm = date.getMonth() + 1;
        var dd = date.getDate();

        var d = (dd>9 ? '' : '0') + dd;
        var m = (mm>9 ? '' : '0') + mm;
        var y = date.getFullYear();

        var sep = format.substring(1, 2);
        format = format.replace(new RegExp(sep, 'g'), '');

        var result = [];
        if(format == 'Ymd'){
            result.push(y);
            result.push(m);
            result.push(d);
        }else if(format == 'dmY'){
            result.push(d);
            result.push(m);
            result.push(y);
        }
        return result.join(sep ? sep : '/');
    }else{
        return '';
    }
});

Vue.filter('datetime', function (value, format) {
    if(value){
        var date = new Date(value);
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var y = date.getFullYear();
        var hh = date.getHours();
        var ii = date.getMinutes();
        var ss = date.getSeconds();

        var d = (dd>9 ? '' : '0') + dd;
        var m = (mm>9 ? '' : '0') + mm;
        var h = (hh>9 ? '' : '0') + hh;
        var i = (ii>9 ? '' : '0') + ii;
        var s = (ss>9 ? '' : '0') + ss;

        var sep = format.substring(1, 2);
        format = format.replace(new RegExp(sep, 'g'), '');

        var date_data = [];
        var time_data = [];

        time_data.push(h);
        time_data.push(i);
        //time_data.push(s);

        if(format.indexOf('Ymd') !== -1){
            date_data.push(y);
            date_data.push(m);
            date_data.push(d);
        }else{
            date_data.push(d);
            date_data.push(m);
            date_data.push(y);
        }
        return date_data.join(sep ? sep : '/') + ' ' + time_data.join(':');
    }else{
        return '';
    }
});