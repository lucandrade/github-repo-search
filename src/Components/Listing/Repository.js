import React from "react";

export default function Repository({ avatarUrl, url, name, description }) {
  return (
    <div className="item">
      <div className="image">
        <img src={avatarUrl} alt="Avatar" />
      </div>
      <div className="details">
        <a href={url} target="_blank" className="title">{name}</a>
        <p>{description}</p>
      </div>
    </div>
  );
}
