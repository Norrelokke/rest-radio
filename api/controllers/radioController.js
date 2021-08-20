const fetch = require("node-fetch");

const utils = require("../core/utilities");

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?format=json&pagination=False`
  );
  channels = await channels.json();
  res.json(channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?format=json`
  );
  channel = await channel.json();
  res.json(channel);
};

const getProgramById = async (req, res) => {
  let program = await fetch(
    `http://api.sr.se/api/v2/programs/index?channelId=${req.params.channelId}&format=json&pagination=False`
  );
  program = await program.json();
  res.json(program);
};

const getSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?format=json&pagination=False&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();

  channelSchedule.schedule = channelSchedule.schedule.map((p) => {
    return {
      ...p,
      starttimeutc: utils.convertToDateObject(p.starttimeutc),
      endtimeutc: utils.convertToDateObject(p.endtimeutc),
    };
  });

  res.json(channelSchedule.schedule);
};

const getCategoryById = async (req, res) => {
  let category = await fetch(
    `http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.channelId}&format=json&pagination=False`
  );
  category = await category.json();
  res.json(category);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getProgramById,
  getSchedule,
  getCategoryById,

};
