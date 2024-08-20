import React, { useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import { getMatches } from "../../services/match";
import FilterForm from "./FilterForm";
import {
  getMonthNameDayYearFormattedDate,
  getYearMonthDayFormattedDate,
} from "../../utils/date";
import MatchCard from ".././../components/MatchCard";
import ErrorMessage from "../../components/Error/ErrorMessage";
import Loading from "../../components/Loading";
import NoMatchFound from "../../components/NoMatchFound";

export default function Matches() {

  // Default date values
  const today = new Date();
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [filter, setFilter] = useState({
    category: "all",
    fromDate: getYearMonthDayFormattedDate(oneWeekAgo),
    toDate: getYearMonthDayFormattedDate(today),
  });


  const localFromDate = new Date(filter.fromDate)
  localFromDate.setHours(0, 0, 0, 0);

  const localToDate = new Date(filter.toDate)
  localToDate.setHours(23, 59, 59, 999);
  
  const {
    loading,
    error,
    value: matches,
  } = useAsync(
    () =>
      getMatches({
        category: filter.category,
        fromDate: localFromDate.toISOString(),
        toDate: localToDate.toISOString(),
      }),
    [filter.category, filter.fromDate, filter.toDate]
  );

  function handleFilterChange(e) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  }


  return (
    <div className="matches">
      <div className="container">
        <FilterForm filter={filter} onFilterChange={handleFilterChange} />
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : matches.length > 0 ? (
            <>
              <h1 className="page-heading text-xl-bold">{`${filter.category} matches ${
                filter.fromDate === filter.toDate
                  ? `on ${getMonthNameDayYearFormattedDate(filter.fromDate)}`
                  : `from ${getMonthNameDayYearFormattedDate(
                      filter.fromDate
                    )} to ${getMonthNameDayYearFormattedDate(filter.toDate)}`
              }`}</h1>

              {matches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </>
          ) : (
            <NoMatchFound />
          )}
        </div>
      </div>
    </div>
  );
}
