import React from 'react'
import {useAsync} from "../../hooks/useAsync"
import { getMatchesByUmpire } from '../../services/match'
import MatchCard from '../../components/MatchCard'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/Error/ErrorMessage'
import NoMatchFound from '../../components/NoMatchFound'

export default function MatchesByUmpire() {
    const {umpireId} = useParams()
    const {loading, error, value: matches} = useAsync(() => getMatchesByUmpire({umpireId}), [umpireId])

    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <ErrorMessage error={error}/>
    }
    if(matches.length === 0) {
        return <NoMatchFound/>
    }
    
  return (
    <div className="matches-by-umpire">
      <div className="container">
        <h1 className="page-heading text-xl-bold">Matches created by you</h1>
        <div className="matches">
          {matches.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}
