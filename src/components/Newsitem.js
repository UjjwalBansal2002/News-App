import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
    let { title, desc, imageUrl ,newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: '18rem' }}>
          <img src={imageUrl} className="card-img-top" alt="news" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem