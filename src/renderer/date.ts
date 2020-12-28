import {Duration} from "dayjs/plugin/duration";

export namespace DateUtils {

    export function formatDuration(duration: Duration): string {
        if (duration.days() > 0) {
            return duration.format("DD[d] HH[h] mm[m] ss[s]")
        } else if (duration.hours() > 0) {
            return duration.format("HH[h] mm[m] ss[s]")
        } else {
            return duration.format("mm[m] ss[s]")
        }
    }

}
