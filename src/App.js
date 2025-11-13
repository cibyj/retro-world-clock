import { useState, useEffect } from "react";
import "./index.css";

const timezones = [
  { tz: "America/New_York", label: "Eastern Time", cities: ["New York", "Miami", "Boston"] },
  { tz: "America/Chicago", label: "Central Time", cities: ["Chicago", "Houston", "Dallas"] },
  { tz: "America/Denver", label: "Mountain Time", cities: ["Denver", "Phoenix", "Salt Lake City"] },
  { tz: "America/Los_Angeles", label: "Pacific Time", cities: ["Los Angeles", "San Francisco", "Seattle"] },
  { tz: "Europe/London", label: "UK Time", cities: ["London", "Manchester", "Liverpool"] },
  { tz: "Europe/Paris", label: "Central Europe", cities: ["Paris", "Berlin", "Rome"] },
  { tz: "Asia/Kolkata", label: "India Standard Time", cities: ["Mumbai", "Delhi", "Bangalore"] },
  { tz: "Asia/Tokyo", label: "Japan Standard Time", cities: ["Tokyo", "Osaka", "Kyoto"] },
];

function App() {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggle = (tz) => {
    setSelected((prev) =>
      prev.includes(tz) ? prev.filter((z) => z !== tz) : [...prev, tz]
    );
  };

  const getAnalogRotation = (date) => {
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hr = date.getHours();
    return {
      secRotation: sec * 6,
      minRotation: min * 6 + sec * 0.1,
      hrRotation: (hr % 12) * 30 + min * 0.5,
    };
  };

  return (
    <div className="min-h-screen bg-blue-500 p-8 font-mono text-white">
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
        Retro World Clock
      </h1>

      {step === 1 && (
        <div className="max-w-xl mx-auto bg-white/20 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl mb-4">Select Time Zones</h2>
          <div className="grid grid-cols-1 gap-3">
            {timezones.map((z) => (
              <label key={z.tz} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(z.tz)}
                  onChange={() => toggle(z.tz)}
                  className="accent-red-400"
                />
                <span>{z.label}</span>
              </label>
            ))}
          </div>
          <button
            className="mt-6 w-full bg-blue-700 hover:bg-blue-600 p-3 rounded-xl text-lg shadow-lg"
            onClick={() => setStep(2)}
          >
            Show Clocks
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {selected.map((tz) => {
            const zone = timezones.find((t) => t.tz === tz);
            const local = new Date(now.toLocaleString("en-US", { timeZone: tz }));
            const { secRotation, minRotation, hrRotation } = getAnalogRotation(local);

            return (
              <div
                key={tz}
                className="bg-white/20 p-6 rounded-2xl shadow-xl border border-white/30"
              >
                <h2 className="text-2xl mb-3">{zone.label}</h2>
                <p className="mb-3 opacity-80 text-sm">
                  Major cities: {zone.cities.join(", ")}
                </p>

                {/* Analog Clock */}
                <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-white shadow-inner bg-black/40">
                  <div
                    className="absolute w-1 h-16 bg-red-400 top-4 left-1/2 origin-bottom"
                    style={{ transform: `translateX(-50%) rotate(${secRotation}deg)` }}
                  />
                  <div
                    className="absolute w-2 h-14 bg-white top-6 left-1/2 origin-bottom"
                    style={{ transform: `translateX(-50%) rotate(${minRotation}deg)` }}
                  />
                  <div
                    className="absolute w-3 h-10 bg-blue-200 top-10 left-1/2 origin-bottom"
                    style={{ transform: `translateX(-50%) rotate(${hrRotation}deg)` }}
                  />
                </div>

                {/* Digital Time */}
                <p className="mt-4 text-center text-3xl font-bold drop-shadow">
                  {local.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
