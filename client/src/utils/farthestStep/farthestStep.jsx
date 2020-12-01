const steps = [
  '/', // welcome page
  '/search',
  '/confirm',
  '/map',
];

export const getWelcomeMessage = (step) => {
  switch (step) {
    case null:
      return 'Welcome!';
    default:
      return 'Welcome Back!';
  }
};

export const getCustomMessage = (path) => {
  switch (path) {
    case null:
      return "Looks like this is your first time here. No worries if you don't have an article to use, just click the `Populate Sample` button on the next page.";
    case '/':
      return "Looks like you didn't search anything last time you were here. If you don't have an article to use, just click the `Populate Sample` button on the next page.";
    case '/search':
    case '/confirm':
      return "Looks like you weren't able to finish your last search. If you're hitting an error, please contact me on GitHub (see footer).";
    case '/map':
      return null;
    default:
      return null;
  }
};

/**
 * @summary - Util func to update localStorage when a user leaves each page (ie. on unmount)
 *    - if there's no farthest step, set it to the currentPage
 */
export const updateFarthestStep = () => {
  const farthestStep = localStorage.getItem('farthestStep');
  const currentPage = window.location.pathname;

  if (!farthestStep) {
    localStorage.setItem('farthestStep', currentPage);
    return;
  }

  const stepIndex = steps.findIndex((step) => step === currentPage);
  const farthestStepIndex = steps.findIndex((step) => step === farthestStep);
  if (stepIndex > farthestStepIndex) {
    localStorage.setItem('farthestStep', currentPage);
    return;
  }
};
