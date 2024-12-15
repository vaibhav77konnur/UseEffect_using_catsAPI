import React, { useEffect, useState } from "react";

{
  /*
  useEffect(() => {
    const fetchCats = async () => {
      const url = "https://api.thecatapi.com/v1/images/search?limit=5"; // Fetch 5 cat images
      const apiKey =
        "live_3YiI1K5MCbeTvOzSzPQoIEmcTGtwAD6yg7avX9fU44yfrKyKeA75uAyrmOCtPTNk"; */
}

export default function App() {
  const [showcat, setshowcat] = useState(false);

  function handleshowcat() {
    setshowcat((prev) => !prev);
  }
  return (
    <div align="center">
      <header
        style={{
          background: "black",
          color: "white",
          height: "70px",
          borderRadius: "3px",
          display: "flex", // Enable flexbox
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically,
        }}
      >
        <h1>Cats Cats Cats...</h1>
      </header>
      <button
        onClick={handleshowcat}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "100px",
        }}
      >
        {showcat ? "❌Close" : " 🐈 Cats"}
      </button>

      {showcat && (
        <div
          style={{
            border: "2px solid black",
            borderRadius: "3px",
            paddingTop: "5px",
            margin: "5px", // Corrected the syntax and property name
          }}
        >
          <Displaycats showcat={showcat} />
        </div>
      )}
    </div>
  );
}

function Displaycats({ showcat }) {
  const [cats, setCats] = useState([]); // State to store cat images
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    async function getcatsdata() {
      const url = "https://api.thecatapi.com/v1/images/search?limit=5";
      const key =
        "live_3YiI1K5MCbeTvOzSzPQoIEmcTGtwAD6yg7avX9fU44yfrKyKeA75uAyrmOCtPTNk";

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data) {
          setCats(data);
        } else {
          console.log("Error : internal server error");
          setError("Error : internal server error");
        }
      } catch {
        setError("error : internal server error");
      }
    }
    getcatsdata();
  }, [showcat, cats]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 5 columns
            gap: "20px", // Space between grid items
            marginTop: "20px",
          }}
        >
          {cats.map((cat, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px", // Space between images
                  marginTop: "20px",
                }}
              >
                <img
                  src={cat.url}
                  alt="A cute cat"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "15px", // Rounded corners
                    border: "2px solid black",
                    objectFit: "cover", // Ensure image fits within the bounds
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px", // Space between images
  marginTop: "20px",
};

const imageStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "15px", // Rounded corners
  border: "2px solid black",
  objectFit: "cover", // Ensure image fits within the bounds
};
