import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Upload } from "lucide-react";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

const mockStats = {
  totalWatched: 120,
  totalDays: 55,
  watchStreak: 14,
  genres: [
    { name: "Action", value: 30 },
    { name: "Drama", value: 25 },
    { name: "Comedy", value: 20 },
    { name: "Sci-Fi", value: 15 },
    { name: "Romance", value: 30 },
  ],
  media: [
    {
      id: 1,
      name: "Inception",
      image: "https://image.tmdb.org/t/p/w300/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
      status: "watched",
    },
    {
      id: 2,
      name: "Your Name",
      image: "https://image.tmdb.org/t/p/w300/xq1Ugd62d23K2knRUx6xxuALTZB.jpg",
      status: "watching",
    },
    {
      id: 3,
      name: "Breaking Bad",
      image: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      status: "plan",
    },
    {
      id: 4,
      name: "Demon Slayer",
      image: "https://image.tmdb.org/t/p/w300/xPpXYnCWfjkt3zzE0dpCNME1pXF.jpg",
      status: "dropped",
    },
    {
      id: 5,
      name: "Interstellar",
      image: "https://image.tmdb.org/t/p/w300/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      status: "watched",
    },
  ],
};

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleProfileHover = () => setShowUpload(true);
  const handleProfileLeave = () => setShowUpload(false);

  const filteredMedia =
    filterStatus === "all"
      ? mockStats.media
      : mockStats.media.filter((item) => item.status === filterStatus);

  const renderSection = () => (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Watched</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {mockStats.totalWatched}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Days Watched</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {mockStats.totalDays}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Watch Streak</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {mockStats.watchStreak} days
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Genres</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockStats.genres}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={5}
                label={({ name }) => name}
              >
                {mockStats.genres.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 px-2 md:px-0">
        {['all', 'watched', 'watching', 'plan', 'dropped'].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow transition ${
              filterStatus === status ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-2 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-medium text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 bg-gradient-to-r from-blue-50 to-purple-100 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div
          className="relative group"
          onMouseEnter={handleProfileHover}
          onMouseLeave={handleProfileLeave}
        >
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
          />
          {showUpload && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-3 py-2 rounded-md text-xs flex items-center gap-1">
              <Upload size={14} /> Upload
            </div>
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            @moviefan123
          </h1>
          <span className="text-sm text-gray-500 hidden md:block">
            moviefan@gmail.com
          </span>
        </div>
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex flex-wrap gap-3 mb-6">
          <Tab className="bg-white px-5 py-2 rounded-full shadow-md text-sm font-medium cursor-pointer hover:bg-gray-100">
            Overview
          </Tab>
          <Tab className="bg-white px-5 py-2 rounded-full shadow-md text-sm font-medium cursor-pointer hover:bg-gray-100">
            Movie
          </Tab>
          <Tab className="bg-white px-5 py-2 rounded-full shadow-md text-sm font-medium cursor-pointer hover:bg-gray-100">
            Anime
          </Tab>
          <Tab className="bg-white px-5 py-2 rounded-full shadow-md text-sm font-medium cursor-pointer hover:bg-gray-100">
            TV Show
          </Tab>
        </TabList>

        <TabPanel>{renderSection()}</TabPanel>
        <TabPanel>{renderSection()}</TabPanel>
        <TabPanel>{renderSection()}</TabPanel>
        <TabPanel>{renderSection()}</TabPanel>
      </Tabs>
    </div>
  );
}
