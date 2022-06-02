import { Fragment } from "react";

import HeroBanner from "../components/Layout/MeetingsPage/HeroBanner";
import MeetingList from "../components/Layout/MeetingsPage/MeetingList";
// import supabase from "../supabaseClient";

const MeetingsPage = (props) => {
  return (
    <Fragment>
      <HeroBanner />
      <MeetingList />
    </Fragment>
  );
};

export default MeetingsPage;
