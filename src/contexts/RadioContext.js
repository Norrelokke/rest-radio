import { createContext, useState, useEffect } from "react";
export const RadioContext = createContext();
const fetch = require("node-fetch");

const RadioProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);

  const [program, setProgram] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const [category, setCategory] = useState(null);
  const [favoriteChannels, setFavoriteChannels] = useState(null);
  const [favoritePrograms, setFavoritePrograms] = useState(null);

  useEffect(() => {
    getAllChannels();
  }, []);

  useEffect(() => {
    getFavoritePrograms();
  }, []);

  useEffect(() => {
    getFavoriteChannels();
  }, []);


  const getAllChannels = async () => {
    let response = await fetch("/api/v1/channels");
    let data = await response.json();
    setChannels(data);
  };

  const getChannelById = async (Id) => {
    let channel = await fetch(`/api/v1/channels/${Id}`);
    channel = await channel.json();
    setSingleChannel(channel);
  };

  const getProgramById = async (Id) => {
    let program = await fetch(`/api/v1/programs/${Id}`);
    program = await program.json();
    setProgram(program);
  };

  const getSchedule = async (Id) => {
    let schedule = await fetch(`/api/v1/schedule/${Id}`);
    schedule = await schedule.json();
    setSchedule(schedule);
  };

  const getFavoriteChannels = async () => {
    let response = await fetch("/api/v1/user/getFavoriteChannels");
    let data = await response.json();
    setFavoriteChannels(data);
  };

  const getFavoritePrograms = async () => {
    let response = await fetch("/api/v1/user/getFavoritePrograms");
    let data = await response.json();
    setFavoritePrograms(data);
  };

  const getCategoryById = async (Id) => {
    let category = await fetch(`/api/v1/category/${Id}`);
    category = await category.json();
    setCategory(category);
  };

  const values = {
    channels,
    getAllChannels,
    singleChannel,
    getChannelById,
    program,
    getProgramById,
    schedule,
    getSchedule,
    category,
    getCategoryById,
    favoriteChannels,
    getFavoriteChannels,
    getFavoritePrograms,
    favoritePrograms,
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioProvider;
