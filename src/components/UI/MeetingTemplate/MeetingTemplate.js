import React, { useEffect, useState } from "react";

import supabase from "../../../supabaseClient";

import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MeetingTemplate = () => {
  const [meeting, setMeeting] = useState({});
  const [value, setValue] = useState("");
  let { id } = useParams();

  useEffect(() => {
    getMeeting();
    // eslint-disable-next-line
  }, []);

  const getMeeting = async () => {
    const { data: meeting, error } = await supabase
      .from("meetings")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.log(error);
    else {
      setMeeting(meeting);
      console.log(meeting);
    }
  };

  return (
    <Box
      sx={{
        mt: "4rem",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        TITLE
      </Typography>
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
        {meeting.title}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", mt: "0.5rem" }}>
        {meeting.held_at}
      </Typography>
      <Box sx={{ mt: "3rem" }}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Box>
    </Box>
  );
};

export default MeetingTemplate;
