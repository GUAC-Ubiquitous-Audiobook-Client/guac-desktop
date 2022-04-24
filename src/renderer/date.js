"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
var DateUtils;
(function (DateUtils) {
    function formatDuration(duration) {
        if (duration.days() > 0) {
            return duration.format("DD[d] HH[h] mm[m] ss[s]");
        }
        else if (duration.hours() > 0) {
            return duration.format("HH[h] mm[m] ss[s]");
        }
        else {
            return duration.format("mm[m] ss[s]");
        }
    }
    DateUtils.formatDuration = formatDuration;
})(DateUtils = exports.DateUtils || (exports.DateUtils = {}));
