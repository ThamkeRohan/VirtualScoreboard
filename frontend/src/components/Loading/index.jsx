import React from 'react'

export default function Loading({isBtnLoading}) {
  return (
    <div className={`loading ${isBtnLoading ? "btn-loading" : ""}`}>
      <img src={`${window.location.origin}/assets/loaders/spinner.gif`} alt="spinner" />
    </div>
  )
}
