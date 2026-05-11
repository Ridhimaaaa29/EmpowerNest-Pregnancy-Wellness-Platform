import { useState } from "react";

interface Milestone {
  name: string;
  date: string;
  gallery: string[]; // Array of image URLs
}

export default function Milestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]); // Start with an empty array
  const [newMilestone, setNewMilestone] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newGallery, setNewGallery] = useState<File[]>([]);

  const addMilestone = () => {
    if (newMilestone && newDate) {
      const milestone: Milestone = {
        name: newMilestone,
        date: newDate,
        gallery: [], // Initially empty, images will be added later
      };
      setMilestones([...milestones, milestone]);
      setNewMilestone("");
      setNewDate("");
      setNewGallery([]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedMilestones = [...milestones];
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      updatedMilestones[index].gallery = [...updatedMilestones[index].gallery, ...newImages];
      setMilestones(updatedMilestones);
    }
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-black">Milestones</h2>
      {milestones.length === 0 ? (
        <p className="text-gray-600">No milestones yet. Add one to get started!</p>
      ) : (
        <ul className="space-y-4">
          {milestones.map((milestone, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-black">{milestone.name}</h3>
                    <p className="text-sm text-gray-600">{milestone.date}</p>
                  </div>
                  <button
                    onClick={() => removeMilestone(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {milestone.gallery.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`Milestone ${index + 1} Image ${imageIndex + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="ml-6">
                <label className="block mb-2 text-sm font-medium text-black">
                  Add Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, index)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-black">Add New Milestone</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter milestone"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button
            onClick={addMilestone}
            className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Add Milestone
          </button>
        </div>
      </div>
    </div>
  );
}