import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {eachMatchCardDetails} = this.props
    const {
      competingTeam,
      competingTeamLogo,
      result,
      matchStatus,
    } = eachMatchCardDetails

    const statusColor =
      matchStatus === 'Won'
        ? 'recent-match-card-status-green'
        : 'recent-match-card-status-white'

    return (
      <li className="recent-match-card">
        <img
          className="recent-match-card-img"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
        <p className="recent-match-card-team">{competingTeam}</p>
        <p className="recent-match-card-result">{result}</p>
        <p className={statusColor}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
