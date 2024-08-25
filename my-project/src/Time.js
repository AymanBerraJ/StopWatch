import React, { useState, useEffect } from "react";

const Time = () => {
  // State pour stocker le temps
  const [time, setTime] = useState(0);

  // State pour vérifier si le chronomètre est en marche ou non
  const [isRunning, setIsRunning] = useState(false);

  // State pour stocker les résumés du temps
  const [resumeTimes, setResumeTimes] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // Incrémenter le temps toutes les 10 millisecondes avec setInterval
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Calcul des heures
  const hours = Math.floor(time / 360000);

  // Calcul des minutes
  const minutes = Math.floor((time % 360000) / 6000);

  // Calcul des secondes
  const seconds = Math.floor((time % 6000) / 100);

  // Calcul des dixièmes de seconde
  const tenths = Math.floor((time % 100) / 10);

  // Calcul des centièmes de seconde (millisecondes)
  const hundredths = time % 10;

  // Méthode pour démarrer et arrêter le chronomètre
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Méthode pour réinitialiser le chronomètre à 0
  const reset = () => {
    setTime(0);
    setResumeTimes([]);
  };

  // Méthode pour garder la valeur après le clic
  const resume = () => {
    const currentTime = {
      hours,
      minutes,
      seconds,
      tenths,
      hundredths,
    };
    setResumeTimes([...resumeTimes, currentTime]);
  };

  return (
    <div className="flex flex-col mt-5 items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <p className="text-4xl font-mono text-gray-800 mb-4">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {tenths.toString().padStart(1, "0")}
        {hundredths.toString().padStart(1, "0")}
      </p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={startAndStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          onClick={reset}
        >
          Reset
        </button>

        <button 
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={resume}
        >
          Resume
        </button>
      </div>
      <div className="resume-list mt-4">
        <ul>
          {resumeTimes.map((time, index) => (
            <li key={index} className="text-lg">
                {index + 1}:  {time.hours.toString().padStart(2, "0")}:
                {time.minutes.toString().padStart(2, "0")}:
                {time.seconds.toString().padStart(2, "0")}:
                {time.tenths.toString().padStart(1, "0")}
                {time.hundredths.toString().padStart(1, "0")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Time;
