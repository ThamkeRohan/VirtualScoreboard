import React from 'react'
import ReactDOM from "react-dom";
import { markMatchAsCompleted } from '../../services/match'
import {useAsyncFn} from "../../hooks/useAsync"
import {useNavigate, useParams} from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function MarkMatchAsComplete({disconnectSocketOnError}) {
    const {umpire} = useAuth()
    const {matchId} = useParams()
    const markMatchAsCompletedFn = useAsyncFn(() => markMatchAsCompleted({matchId}))
    const navigate = useNavigate()

    function handleMatchCompleted() {
        markMatchAsCompletedFn.execute()
        .then(() => navigate(`/matches/umpires/${umpire._id}`))
        .catch(error => disconnectSocketOnError(error))
    }
  
    return (
      <button
        type="button"
        onClick={handleMatchCompleted}
        className="btn btn-block match-confirmation-btn"
      >
        Mark match as completed
      </button>
    );
}
