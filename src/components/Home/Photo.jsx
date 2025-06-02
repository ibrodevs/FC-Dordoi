import React from "react";

const LongPhoto = ({ url, alt = "Long Photo" }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 overflow-auto">
      <img
        src={url}
        alt={alt}
        className="w-full h-auto rounded-xl shadow-md object-contain"
      />
    </div>
  );
};

export default LongPhoto;
