import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HistoriesPage from "pages/histories";
import HistoryPage from "pages/histories/history";
import ItemsPage from "pages/items";
import RootPage from "pages/root";
import SignInPage from "pages/auth/sign-in";
import SignUpPage from "pages/auth/sign-up";
import StatisticsPage from "pages/statistics";

import { useAppDispatch, useAppSelector } from "redux/store";
import { setUser } from "redux/user/slice";

import { getUserFromStorage } from "services/storage";

const App = () => {
  const dispatch = useAppDispatch();
  const localStorageUser = getUserFromStorage();
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (!localStorageUser || user) return;

    dispatch(setUser(localStorageUser));
  }, [dispatch, localStorageUser, user]);

  return (
    <Routes>
      {localStorageUser ? (
        <Route element={<RootPage />}>
          <Route path="items" element={<ItemsPage />} />
          <Route path="history">
            <Route index element={<HistoriesPage />} />
            <Route path=":id" element={<HistoryPage />} />
          </Route>
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="*" element={<Navigate to="items" />} />
        </Route>
      ) : (
        <>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="sign-in" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
