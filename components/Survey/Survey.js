import React from "react";
import "./SurveyPage.css";

function SurveyPage({ formData, setFormData }) {
  const handleOptionChange = (option) => {
    setFormData({ ...formData, selectedOption: option });
  };

  return (
    <div className="survey-container">
      <select
        className="select-field"
        value={formData.gender}
        onChange={(e) => {
          setFormData({ ...formData, gender: e.target.value });
        }}
        required // Add required attribute
      >
        <option value="">Select your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      
      {/* Other input fields */}
      <div className="options-container">
      <input
        type="number"
        placeholder="What's your age?"
        value={formData.age}
        onChange={(e) => {
          setFormData({ ...formData, age: e.target.value });
        }}
        required 
      />
        <p>What’s the problem with fabric waste?:</p>
        <label className="option-label">
          <input
            type="radio"
            value="option1"
            checked={formData.selectedOption === "92M tons of fabric is wasted each year."}
            onChange={() => handleOptionChange("92M tons of fabric is wasted each year.")}
            required // Add required attribute
          />
          92M tons of fabric is wasted each year.
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="option2"
            checked={formData.selectedOption === "Nothing happen"}
            onChange={() => handleOptionChange("Nothing happen")}
            required 
          />
          Nothing happen
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="option3"
            checked={formData.selectedOption === "100% fabric is recycled"}
            onChange={() => handleOptionChange("100% fabric is recycled")}
            required 
          />
          100% fabric is recycled
        </label>
      </div>
      
      <textarea
        className="textarea-field"
        placeholder="Anything to share with us..."
        value={formData.about}
        onChange={(e) => {
          setFormData({ ...formData, about: e.target.value });
        }}
      />
    </div>
  );
}

export default SurveyPage;
