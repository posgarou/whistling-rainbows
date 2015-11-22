import range from "lodash/utility/range";

export default range(12).map(i => 360 - (i * (360 / 12)));
