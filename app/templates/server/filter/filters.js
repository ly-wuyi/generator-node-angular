/**
 * Created by ly on 2015/8/24.
 */

var filters = {
    format: function (time) {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
};

module .exports = {
    filters: filters
}