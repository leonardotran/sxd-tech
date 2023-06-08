import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpInfo from "./components/Signup/SignUpInfo";
import Form from "./components/Form";
import SurveyRecap from "./components/Recap/Recap"
import { validateEmail, validateUsername, validatePasswordStrength } from './components/Signup/SignUpInfo';

//========================== BEGINNING OF TEST===============================\\
describe('validateUsername', () => {
  it('returns true for valid usernames', () => {
    // Valid usernames
    expect(validateUsername('john_doe')).toBe(true);
    expect(validateUsername('JaneDoe123')).toBe(true);
    expect(validateUsername('user name')).toBe(true);
  });

  it('returns false for invalid usernames', () => {
    // Invalid usernames
    expect(validateUsername('john.doe')).toBe(false); // Contains invalid character '.'
    expect(validateUsername('12312')).toBe(false); // Contains only numbers
    expect(validateUsername('')).toBe(false); // Empty username
  });
});

//=========================================================\\
describe('validatePassword', () => {
      // Valid password
  it('returns true for valid password', () => {
    expect(validatePasswordStrength('1233456789')).toBe(true);
  });

  it('returns false for invalid password', () => {
    // Invalid password
    expect(validatePasswordStrength('123')).toBe(false);
    expect(validatePasswordStrength(' ')).toBe(false);
  });
});
//=========================================================\\

describe('validateUsername', () => {
  it('returns true for valid usernames', () => {
    // Valid usernames
    expect(validateUsername('john_doe')).toBe(true);
    expect(validateUsername('JaneDoe123')).toBe(true);
    expect(validateUsername('user name')).toBe(true);
  });
});
//=========================================================\\

//Test for valid email
test('Should return true for a valid email', () => {
  const validEmail = 'test@example.com';
  const result = validateEmail(validEmail);
  expect(result).toBe(true);
});

test('Should return false for an invalid email', () => {
  const invalidEmail = 'invalid.email';
  const result = validateEmail(invalidEmail);
  expect(result).toBe(false);
});
//=========================================================\\

//Expect warning popup when 'Next' is clicked with invalid email

test("Expect warning popup when 'Next' is clicked with invalid email", () => {
  const { getByText, getByPlaceholderText, queryByTestId } = render(<Form />);

  // Navigate to the first page
  fireEvent.click(getByText('Next'));

  // Simulate typing an invalid email
  const emailInput = getByPlaceholderText('Enter Your Email');
  fireEvent.change(emailInput, { target: { value: 'invalid_email' } });

  // Click 'Next' button
  fireEvent.click(getByText('Next'));

  // Expect warning popup to be displayed
  const warningPopup = queryByTestId('warning-popup');
  expect(warningPopup);
});
//=========================================================\\

//Check Confirmation Page output the user's input correctly
describe("SurveyRecap", () => {
  it("displays the correct user input", () => {
    const formData = {
      gender: "Female",
      selectedOption: "Option 2",
      age: "25-34",
      about: "Some information about the user",
    };

    const { getByText } = render(<SurveyRecap formData={formData} />);

    const getByTextContent = (text) =>
      getByText((content, element) => {
        const hasText = (node) => node.textContent === text;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );

        return elementHasText && childrenDontHaveText;
      });

    expect(getByTextContent("Gender: Female")).toBeInTheDocument();
    expect(getByTextContent("Selected Option: Option 2")).toBeInTheDocument();
    expect(getByTextContent("Age: 25-34")).toBeInTheDocument();
    expect(getByTextContent("About: Some information about the user")).toBeInTheDocument();
  });
});

//========================== END OF TEST===============================\\