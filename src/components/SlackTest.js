import React from "react";
import axios from "axios";

const SlackTest = () => {
  const onHandleClick = async () => {
    const slackToken = "xoxb-3018164414756-3907084483186-TLwvNfA7UNbnQnrkceVHxGAL";
    const url = "https://slack.com/api/chat.postMessage";
    try {
      const res = await axios.post(
        url,
        {
          channel: "#test",
          text: "Hello, World!",
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );

      console.log("Done", res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={onHandleClick}>Send to Slack</button>
    </div>
  );
};

export default SlackTest;
