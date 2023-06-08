import { createMachine, assign } from 'xstate';

const signUpInfoMachine = createMachine({
  id: 'signUpInfo',
  initial: 'idle',
  context: {
    formData: {
      email: '',
      isEmailValid: true,
      username: '',
      isUsernameValid: true,
      password: '',
      isPasswordStrong: true,
      confirmPassword: '',
    },
  },
  states: {
    idle: {
      on: {
        EMAIL_CHANGE: {
          actions: assign((context, event) => {
            const email = event.email;
            const isEmailValid = validateEmail(email);
            return {
              ...context.formData,
              email,
              isEmailValid,
            };
          }),
        },
        USERNAME_CHANGE: {
          actions: assign((context, event) => {
            const username = event.username;
            const isUsernameValid = validateUsername(username);
            return {
              ...context.formData,
              username,
              isUsernameValid,
            };
          }),
        },
        PASSWORD_CHANGE: {
          actions: assign((context, event) => {
            const password = event.password;
            const isPasswordStrong = validatePasswordStrength(password);
            return {
              ...context.formData,
              password,
              isPasswordStrong,
            };
          }),
        },
        CONFIRM_PASSWORD_CHANGE: {
          actions: assign((context, event) => {
            const confirmPassword = event.confirmPassword;
            return {
              ...context.formData,
              confirmPassword,
            };
          }),
        },
        FORM_SUBMIT: [
          {
            target: 'formSubmissionFailed',
            cond: (context) =>
              context.formData.email.trim() === '' ||
              context.formData.username.trim() === '',
          },
          {
            target: 'formSubmissionFailed',
            cond: (context) => !isFormValid(context.formData),
          },
          {
            target: 'formSubmitted',
          },
        ],
      },
    },
    formSubmissionFailed: {
      // Form submission failed state
    },
    formSubmitted: {
      // Form submitted state
    },
  },
});

// Helper function to check form validity
function isFormValid(formData) {
  const {
    isEmailValid,
    isUsernameValid,
    password,
    confirmPassword,
    isPasswordStrong,
  } = formData;
  const isPasswordMatch = password === confirmPassword;
  return (
    isEmailValid &&
    isUsernameValid &&
    isPasswordStrong &&
    isPasswordMatch
  );
}

export default signUpInfoMachine;
