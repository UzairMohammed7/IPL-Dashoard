import {Component} from 'react'

import './index.css'

class LatestMatch extends Component {
  render() {
    const {eachlatestMatchDetails} = this.props
    const {
      umpires,
      result,
      manOfTheMatch,
      date,
      venue,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
    } = eachlatestMatchDetails

    return (
      <div className="latest-match-container">
        <h1>Latest Matches</h1>
        <div className="latest-match-card-info">
          <div className="latest-match-info-left-info">
            <p className="latest-match-team-info">{competingTeam}</p>
            <p className="latest-match-date-info">{date}</p>
            <p className="latest-match-venue-info">{venue}</p>
            <p className="latest-match-result-info">{result}</p>
          </div>
          <img
            className="latest-match-img-info"
            src={competingTeamLogo}
            alt={`latest match ${competingTeam} `}
          />

          <div className="latest-match-info-right-info">
            <div>
              <p className="latest-match-first-inning-head-info">
                First Innings
              </p>
              <p className="latest-match-first-inning">{firstInnings}</p>
            </div>
            <div>
              <p className="latest-match-second-inning-head-info">
                Second Innings
              </p>
              <p className="latest-match-second-inning-info">{secondInnings}</p>
            </div>
            <div>
              <p className="latest-match-MOTM-head-info">Match Of The Match</p>
              <p className="latest-match-MOTM-info">{manOfTheMatch}</p>
            </div>
            <div>
              <p className="latest-match-umpire-head-info">Umpires</p>
              <p className="latest-match-umpire-info">{umpires}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LatestMatch
