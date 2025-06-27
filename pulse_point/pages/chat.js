async function send_message() {
  const mess = "hii";
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "user",
            content: mess,
          },
          {
            role:"system",
            content:[
               "you are pulsepoint ai assistant (a doctor booking and consulation website",
               "greet user warmly when it chats with you",
               "if user ask about any disease explain him in very basic way and if user say to suggest doctor than suggest him doctor from doctor list that i will provide"
            ]
          }
        ],
      }),
    }
  );

  const data = await response.json();
  const aiMessage = data.choices[0].message.content ;
  console.log("AI says:", aiMessage);
}

send_message();
