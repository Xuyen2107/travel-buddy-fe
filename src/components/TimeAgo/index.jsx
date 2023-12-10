import * as dateFns from "date-fns";
import PropTypes from "prop-types";

const TimeAgo = ({ date }) => {
   const targetDate = new Date(date);
   const currentDate = new Date();
   const timeDifference = dateFns.differenceInMilliseconds(currentDate, targetDate);

   const timeUnits = [
      // { unit: "year", unitVN: "năm", divisor: 29030400000 },
      // { unit: "month", unitVN: "tháng", divisor: 2419200000 },
      // { unit: "week", unitVN: "tuần", divisor: 604800000 },
      { unit: "day", unitVN: "ngày", divisor: 86400000 },
      { unit: "hour", unitVN: "giờ", divisor: 3600000 },
      { unit: "minute", unitVN: "phút", divisor: 60000 },
      { unit: "second", unitVN: "giây", divisor: 1000 },
   ];

   for (const unit of timeUnits) {
      if (timeDifference >= unit.divisor) {
         const value = Math.floor(timeDifference / unit.divisor);
         return <span>{`${value} ${unit.unitVN}`}</span>;
      }
   }

   return <span>Vừa xong</span>;
};

TimeAgo.propTypes = {
   date: PropTypes.string.isRequired,
};

export default TimeAgo;
