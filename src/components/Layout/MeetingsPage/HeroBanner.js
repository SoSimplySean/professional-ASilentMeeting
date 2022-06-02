import { useState, useEffect, useRef } from "react";

import supabase from "../../../supabaseClient";

import { Grid, Button, Typography, Modal, Box, Input } from "@mui/material";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  input: {
    width: "95%",
    height: "40px",
    outline: "none",
    border: "1px solid #676767",
    borderRadius: "0px",
    padding: "10px",
  },
};

const HeroBanner = () => {
  const [open, setOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const newMeetingTitleRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchMeetings();
  });

  const fetchMeetings = async () => {
    let { data: meetings, error } = await supabase.from("meetings").select("*");
    if (error) console.log(error);
    else setMeetings(meetings);
  };

  const createNewMeeting = async () => {
    const title = newMeetingTitleRef.current.value;
    console.log(title);
    const { data: meeting, error } = await supabase
      .from("meetings")
      .insert({ title: title })
      .single();
    if (error) console.log(error);
    else {
      setMeetings([meeting, ...meetings]);
      newMeetingTitleRef.current.value = "";
      handleClose();
    }
  };

  return (
    <Grid
      sx={{
        mt: "4rem",
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
        Meetings
      </Typography>
      <Button sx={{ mt: "2rem" }} variant="contained" onClick={handleOpen}>
        Create new meeting
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <Input
            type="text"
            inputRef={newMeetingTitleRef}
            name="title"
            placeholder="Add the Title"
            sx={style.input}
          />
          <Button
            sx={{ mt: "2rem" }}
            onClick={createNewMeeting}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </Modal>
      <Typography variant="body1" sx={{ mt: "3rem" }}>
        {JSON.stringify(meetings)}
      </Typography>
    </Grid>
  );
};

export default HeroBanner;
