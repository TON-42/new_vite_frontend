import React from "react";
import {Banner, Text, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";

const Word: React.FC = () => {
  const {user} = useUserContext();

  // Assuming user.words is the balance
  const balance = user.words
    ? user.words.reduce((acc, curr) => acc + curr, 0)
    : 0;
  const underReview = 500; // This value should come from the context or a calculation

  return (
    <div style={{padding: "20px"}}>
      <h1
        className='text-4xl font-bold text-left'
        style={{marginBottom: "32px"}}
      >
        Balance
      </h1>
      <Text weight='3' style={{marginBottom: "16px", padding: "16px"}}>
        Your balance is the amount of $WORDS you have earned by selling your
        chats.
      </Text>
      <div
        style={{display: "flex", justifyContent: "center", overflowX: "auto"}}
      >
        <Banner
          description=''
          header='Balance'
          subheader={`${balance} $WORDS`}
          type='inline'
        >
          <React.Fragment key='.0'></React.Fragment>
        </Banner>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Banner
          description='Your chats are under review for quality and compliance.'
          header='Under Review'
          subheader={`${underReview} $WORDS`}
          type='inline'
          style={{marginBottom: "16px"}}
        >
          <React.Fragment key='.0'></React.Fragment>
        </Banner>
        <Button onClick={() => alert("Get more words clicked")}>
          Get More Words
        </Button>
      </div>
    </div>
  );
};

export default Word;
