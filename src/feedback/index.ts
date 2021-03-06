import FeedbackOutlet from './FeedbackOutlet/FeedbackOutlet';

export { FEEDBACK_FEATURE, reducer } from './reducer';
// can't re-export types b/c of these issues:
// https://github.com/facebook/create-react-app/issues/6054
// https://github.com/Microsoft/TypeScript/issues/28481
export * from './_domain/StoreState';
export { feedbackSaga } from './_sagas';
export { FeedbackOutlet };
