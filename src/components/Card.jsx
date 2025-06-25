import React, { useState, useEffect, useRef } from 'react';
import { Rating, Button } from './';
import { Plus, X, Share2, CheckCircle, Calendar, XCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Card = ({
  id,
  image = "https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg",
  name = "Monkey D. Luffy",
  time = 23,
  seasons = null,
  rating = null,
  genre = ["Action", "Adventure", "Comedy", "Animation"],
  media = { type: "blank", section: "" },
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("watched");
  const [completionDate, setCompletionDate] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rewatched, setRewatched] = useState(0);
  const [completiontype, setCompletionType] = useState("casual");
  const [description, setDescription] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [mediaSave, setmediaSave] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    if (userRating < 0) setUserRating(0);
    if (userRating > 10) setUserRating(10);
    if (rewatched < 0) setRewatched(0);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userRating, rewatched, showPopup]);

  function trimSentence(sentence) {
    if (!sentence) return "";
    const words = sentence.trim().split(/\s+/);
    const trimmedWords = words.slice(0, Math.min(4, words.length));
    return trimmedWords.join(" ");
  }

  const handleSave = async () => {
    try {
      const payload = { id, name, image, status, completionDate, userRating, episodesWatched, media, rewatched, completiontype, description };
      const res = await axios.post(`http://localhost:3000/media/${"add"+media.type}`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        setmediaSave({status: true, message: "Media Saved!" });
      } else {
        setmediaSave({status: false, message: "Media Save Failed!" });
      }
    } catch (error) {
      console.log(error);
      setmediaSave({status: false, message: error.response.data.error });
    }

    handleClosePopup();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleShare = async () => {
    try {
      if (popupRef.current) {
        popupRef.current.style.zIndex = '9999';
        const canvas = await html2canvas(popupRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: 2,
        });
        const ctx = canvas.getContext('2d');
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText('Moviesync', 20, 40);

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${name.replace(/\s+/g, '_')}_watchcard.png`;
        link.click();
        popupRef.current.style.zIndex = '';
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      alert("Oops! Failed to capture image for sharing. Try again.");
    }
  };

  const handlePlusClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setTimeout(() => setShowPopup(false), 200); // matches exit animation duration
  };

  const preventLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="relative min-w-[150px] w-32 max-w-none sm:w-44 md:w-56 lg:w-62 bg-white shadow-xl rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 hover:opacity-90 mx-2 my-4 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-auto object-cover mx-auto" />
        <div className="p-4">
          <h3 className="text-xs sm:text-lg font-semibold text-gray-800">{trimSentence(name)}</h3>
        </div>
        <button
          onClick={handlePlusClick}
          className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded-full shadow-lg z-10"
        >
          <Plus size={24} />
        </button>

        <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-70">
          <p className="text-xs sm:text-sm mb-2"><strong>Runtime:</strong> {time} mins</p>
          {seasons && <p className="text-xs sm:text-sm mb-2"><strong>Seasons:</strong> {seasons}</p>}
          {rating && <p className="text-xs sm:text-sm mb-2"><strong>Rating:</strong> {Math.trunc(rating * 100) / 100}</p>}
          <div className="text-xs sm:text-sm text-center">
            <strong>Genre:</strong>
            {genre.map((data, index) => (
              <Button
                key={index}
                className="bg-green-700 px-2 py-1 mx-1 rounded-3xl text-xs text-sky-50 my-1 font-semibold"
              >
                {data}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup-backdrop"
            onClick={preventLink}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 px-4 py-6 backdrop-blur-sm"
          >
            <motion.div
              ref={popupRef}
              key="popup-content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.2}
              className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-3xl p-8 w-full max-w-xl relative shadow-2xl border-t-4 border-indigo-600 cursor-grab"
            >
              <button onClick={handleClosePopup} className="absolute top-3 right-3 hover:text-red-500">
                <X size={30} />
              </button>
              <div className="flex flex-col items-center gap-6">
                <img src={image} alt={name} className="w-36 h-36 object-cover rounded-xl shadow-md border-2 border-indigo-500" />
                <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight text-center">{name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <option value="watched">✅ Watched</option>
                      <option value="watching">👀 Watching</option>
                      <option value="plan">📝 Plan to Watch</option>
                      <option value="dropped">💤 Dropped</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-1 text-gray-700 flex items-center gap-1">
                      <Calendar size={14} /> Date of Completion
                    </label>
                    <input
                      type="date"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Your Rating</label>
                    <input
                      type="number"
                      max={10}
                      min={0}
                      step={0.1}
                      value={userRating}
                      onChange={(e) => setUserRating(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Episodes Watched</label>
                    <input
                      type="number"
                      value={episodesWatched}
                      onChange={(e) => setEpisodesWatched(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Rewatched !</label>
                    <input
                      type="number"
                      value={rewatched}
                      onChange={(e) => setRewatched(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-gray-700">Watched Mode</label>
                    <select
                      value={completiontype}
                      onChange={(e) => setCompletionType(e.target.value)}
                      className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <option value="binge">📺 Binge</option>
                      <option value="casual">☕ Casual</option>
                      <option value="weekly">📅 Weekly</option>
                      <option value="rewatch">🔁 Rewatch</option>
                      <option value="skipped">⏭️ Skipped Parts</option>
                      <option value="paused">⏸️ Paused</option>
                      <option value="dropped">🛑 Dropped</option>
                      <option value="speedrun">⚡ Speedrun</option>
                      <option value="highlight">✨ Highlights Only</option>
                      <option value="mixed">🔄 Mixed</option>
                      <option value="background">🎧 Background</option>
                    </select>
                  </div>
                </div>

                <div className='w-full'>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Description ?</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="flex w-full gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-100 text-gray-800 shadow"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showConfetti && (
        <div className={`${mediaSave.status ? "bg-green-100 border border-green-400 text-green-700" : " bg-red-100  border-red-400 text-red-700"} fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-md z-[100] animate-bounce`}>
          <div className="flex items-center gap-2">
            {mediaSave.status ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {mediaSave.message}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
