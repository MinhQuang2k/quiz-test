import { configureStore } from "@reduxjs/toolkit";
import multiLanguageReducer from "./multiLanguage";
import questionGroupReducer from "./questionGroup";
import testCategoryReducer from "./testCategory";

const rootReducer = {
  multiLanguageReducer,
  questionGroupReducer,
  testCategoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
