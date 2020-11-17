// One method per module
function intro() {
  return ['00-intro/00-title.md', '00-intro/01-speaker-ame.md', '00-intro/02-experience.md'];
}

function history() {
  return ['01-history/00-small-history.md'];
}

function actions() {
  return ['02-actions/00-INTRO.md','02-actions/01-how-it-works.md','02-actions/02-actions.md'];
}

function formation() {
  return [
    //
    ...intro(), //
    ...history(), //
    ...actions() //
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}
