import React from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import "./SurveyPage.css";

const surveyPageMachine = createMachine({
  id: "surveyPage",
  initial: "idle",
  context: {
    formData: {
      gender: "",
      selectedOption: "",
      age: "",
      about: "",
    },
  },
  states: {
    idle: {
      on: {
        SELECT_GENDER: {
          target: "genderSelected",
          actions: assign({
            formData: (context, event) => ({
              ...context.formData,
              gender: event.gender,
            }),
          }),
        },
      },
    },
    genderSelected: {
      on: {
        SELECT_OPTION: {
          target: "optionSelected",
          actions: assign({
            formData: (context, event) => ({
              ...context.formData,
              selectedOption: event.selectedOption,
            }),
          }),
        },
      },
    },
    optionSelected: {
      on: {
        SUBMIT: "submitted",
        SELECT_OPTION: {
          actions: assign({
            formData: (context, event) => ({
              ...context.formData,
              selectedOption: event.selectedOption,
            }),
          }),
        },
      },
    },
    submitted: {
    },
  },
});

function SurveyPage({ formData, setFormData }) {
  const [current, send] = useMachine(surveyPageMachine);

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    send({ type: "SELECT_GENDER", gender });
  };

  const handleOptionChange = (option) => {
    send({ type: "SELECT_OPTION", selectedOption: option });
  };

  const handleSubmit = () => {
    send({ type: "SUBMIT" });
    console.log("Form submitted:", current.context.formData);
  };

  const { gender, selectedOption, age, about } = current.context.formData;

  return (
    <div className="survey-container">
      <select
        className="select-field"
        value={gender}
        onChange={handleGenderChange}
        required
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
          value={age}
          onChange={(e) => {
            send({ type: "SELECT_GENDER", gender: e.target.value });
          }}
          required
        />
        <p>What’s the problem with fabric waste?:</p>
        <label className="option-label">
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={() => handleOptionChange("option1")}
            required
          />
          92M tons of fabric is wasted each year.
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={() => handleOptionChange("option2")}
            required
          />
          Nothing happens
        </label>
        <label className="option-label">
          <input
            type="radio"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={() => handleOptionChange("option3")}
            required
          />
          100% fabric is recycled
        </label>
      </div>

      <textarea
        className="textarea-field"
        placeholder="Anything to share with us..."
        value={about}
        onChange={(e) => {
          send({ type: "SELECT_GENDER", gender: e.target.value });
        }}
      />
    </div>
  );
}

export default SurveyPage;
