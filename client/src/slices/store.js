import { configureStore } from "@reduxjs/toolkit";
import multiLanguageReducer from "./multiLanguage";
import questionGroupReducer from "./questionGroup";
import testCategoryReducer from "./testCategory";
import questionReducer from "./question";

const rootReducer = {
  multiLanguageReducer,
  questionGroupReducer,
  testCategoryReducer,
  questionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
