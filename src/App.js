
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TheNav from "./components/Navbar";
import Home from "./pages/Home";
import ChannelContextProvider from "./contexts/RadioContext";
import UserContextProvider from "./contexts/UserContext";
import AllChannels from "./pages/AllChannels";
import AllCategories from "./pages/AllCategories";
import SingleChannel from "./pages/SingleChannel";
import SingleCategory from "./pages/SingleCategory";
import LoginPage from "./pages/LoginPage";
import UserRoute from "./components/UserRoutes";
import ProfilePage from "./pages/Profile";
import ProgramsMenu from "./pages/ProgramsMenu";
import ChannelPrograms from "./pages/ChannelPrograms";
import NoPageFound from "./pages/NoPageFound";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <UserContextProvider>
          <ChannelContextProvider>
            <TheNav />
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/AllChannels">
              <AllChannels />
            </Route>
            <Route exact path="/channels/:id" >
              <SingleChannel />
            </Route>
            <Route exact path="/AllCategories">
              <AllCategories />
            </Route>
            <Route exact path="/Category/:channelId">
              <SingleCategory />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <UserRoute exact path="/profile">
              <ProfilePage />
            </UserRoute>
            <Route exact path="/programs">
               <ProgramsMenu />
             </Route>
            <Route exact path="/programs/:channelId">
               <ChannelPrograms />
             </Route>
            <Route>
               <NoPageFound />
             </Route>
            </Switch>
          </ChannelContextProvider>
        </UserContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
