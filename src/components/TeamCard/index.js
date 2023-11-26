import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class TeamCard extends Component {
  render() {
    const {eachTeamData} = this.props
    const {teamImageUrl, id, name} = eachTeamData
    return (
      <Link to={`/team-matches/${id}`} className="link">
        <li className="team-container">
          <img src={teamImageUrl} alt={`${name}`} className="teams-img" />
          <p>{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
