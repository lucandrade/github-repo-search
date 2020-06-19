import React from "react";

export default function Repository({ stars, forks, avatarUrl, url, name, description }) {
  return (
    <div className="item">
      <div className="image">
        <img src={avatarUrl} alt="Avatar" />
      </div>
      <div className="details">
        <a href={url} target="_blank" className="title">{name}</a>
        <span>Stars: {stars}</span>
        <span>Forks: {forks}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
