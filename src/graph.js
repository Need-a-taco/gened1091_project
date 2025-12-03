function LifeEvent(id, age, description) {
  let _id = id;
  let _age = age;
  let _description = description;

  let options = {};

  return {
    getId: () => _id,
    getAge: () => _age,
    getDescription: () => _description,

    /**
     * dialogueText: string — the option text the player sees
     * philosopher: string — which philosopher this option aligns with
     * nextEvents: LifeEvent object or array of LifeEvent objects — pointer(s) to next life event(s)
     *             If array, one will be randomly selected with equal probability
     * careerPoints, parentsPoints, childrenPoints: number — point values
     */
    addOption(dialogueText, philosopher, nextEvents, careerPoints, parentsPoints, childrenPoints) {
      // Ensure nextEvents is always stored as an array for consistency
      const nextEventsArray = Array.isArray(nextEvents) ? nextEvents : [nextEvents];
      
      options[dialogueText] = { 
        philosopher,
        nextEvents: nextEventsArray,
        careerPoints,
        parentsPoints,
        childrenPoints
      };
    },
    

    getOption(dialogueText) {
      return options[dialogueText];
    },

    getAllOptions() {
      return options;
    }
  };
}


const event_8b713344 = LifeEvent(
  "8b713344-a9f0-4ef9-b87d-0953fcd4e4a6",
  20,
  "Though it feels pretty far away, your family wants you to decide whether or not you plan on going to college. What is your choice?",
)

const event_66d54855 = LifeEvent(
  "66d54855-0fb4-4ae8-ba17-2746c75cd0b4",
  30,
  "It's hard to believe how fast time is flying. Your family now wants you to start thinking about settling down and starting a family. What is your choice?"
)

const event_7460a2b6 = LifeEvent(
  "7460a2b6-740b-469f-8624-79a45dbbdb12",
  40,
  "Your 10-year-old child asks you if they can sleepover at their friend's house. What will you do?",
)

const event_31fd84e9 = LifeEvent(
  "31fd84e9-2367-40bb-bdc2-c391ba7860b4",
  40,
  "You didn't get married or have kids, so you're feeling a bit lonely. How will you cope?"
)

const event_dd57d480 = LifeEvent(
  "dd57d480-db1e-4d60-b1f1-49509a662bd3",
  40,
  "Your 10-year-old child tells you they're being bullied in school. Your child really wants to see the bully pay for what they have done. What will you do?"
)

const terminal_event = LifeEvent(
  "terminal-0000",
  null,
  "Your journey ends here. Thank you for playing!"
);



event_8b713344.addOption(
  "I plan to go to college. Education is all about getting a transformative experience, and it's really important for bettering myself.",
  "Kongzi",
  event_66d54855,
  1,
  1,
  0,)
event_8b713344.addOption(
  "I plan to go to college, but this is just one path I could have taken. I could have gone to trade school or gotten a job right away. I picked what felt right in the moment.",
  "Laozi",
  event_66d54855,
  1,
  1,
  0,)
event_8b713344.addOption(
  "I will look up the highest paying major out of all the schools that I got into. I will subtract tuition costs along with opportunity costs of not working those 4 years and take into account higher earnings for college graduates. These metrics will guide my decision.",
  "Mozi",
  event_66d54855,
  1,
  0,
  0,)
event_8b713344.addOption(
  "I plan to not go to college. It is best for me to move out of the city and cultivate the farmlands. Or, I could join the military.", 
  "Lord Shang",
  event_66d54855,
  1,
  -1,
  0,)


event_66d54855.addOption(
  "Plan to marry and have children. These relationships will teach me more about myself.",
  "Kongzi",
  [event_7460a2b6, event_dd57d480],
  -1,
  1,
  1,)

event_66d54855.addOption(
  "I don't want to settle down. I have so much love to give, and I don't want to limit it to just one person.",
  "Laozi",
  event_31fd84e9,
  1,
  -1,
  -1,)

event_66d54855.addOption(
  "Have children to take on my responsibilities. I have built too much to just lose it all now.",
  "Mozi",
  [event_7460a2b6, event_dd57d480],
  -1,
  1,
  -1,)
event_66d54855.addOption(
  "Plan to not marry and have no children.",
  "Lord Shang",
  event_31fd84e9,
  1,
  -1,
  -1,)

event_31fd84e9.addOption(
  "Strengthen the existing relationships that ground you—spend time with my family, friends, and mentors.",
  "Kongzi",
  terminal_event,
  -1,
  1,
  0,)

event_31fd84e9.addOption(
  "Accept this natural feeling—emotions rise and fall like clouds, so continue to live simply, wander freely, and let new connections arise with time.",
  "Laozi",
  terminal_event,
  0,
  0,
  0,)

event_31fd84e9.addOption(
  "Channel the loneliness into purposeful work and care for others impartially.",
  "Mozi",
  terminal_event,
  1,
  0,
  0,)
event_31fd84e9.addOption(
  "My meaning is in my productivity—I should get over my feelings and get to work.",
  "Lord Shang",
  terminal_event,
  1,
  -1,
  -1,)

event_dd57d480.addOption(
  "Teach my child how to handle the conflict with virtue and dignity—engage with the teacher and other parents to restore peace in the classroom.",
  "Kongzi",
  terminal_event,
  0,
  0,
  -1,)
event_dd57d480.addOption(
  "Don't overreact or force confrontation—encourage my child to step back, avoid escalation, and continue flowing like water.",
  "Laozi",
  terminal_event,
  0,
  0,
  -1,)
event_dd57d480.addOption(
  "Take practical action to reduce harm. Contact the school, gather facts, and intervene if necessary to ensure the most benefit, even if it takes up time and energy.",
  "Mozi",
  terminal_event,
  -1,
  0,
  0,)
event_dd57d480.addOption(
  "Demand strict punishment to all bullies and their parents to ensure that no one dares to do this again.",
  "Lord Shang",
  terminal_event,
  0,
  0,
  1,)

event_7460a2b6.addOption(
  "Talk with my child and the friend's parents to ensure everything is proper and safe—if the situation is trustworthy and maintains good relationships, I'll allow it.",
  "Kongzi",
  terminal_event,
  0,
  1,
  1,)
event_7460a2b6.addOption(
  "Don't be a helicopter parent—I'll allow my child the opportunity to learn and grow.",
  "Laozi",
  terminal_event,
  0,
  0,
  1,)

event_7460a2b6.addOption(
  "Make the decision that brings the greatest benefit and least harm to your child—whatever my decision is, my child must follow me as the superior.",
  "Mozi",
  terminal_event,
  0,
  1,
  0,)
event_7460a2b6.addOption(
  "I don't want to risk getting punished for child neglect if something goes wrong, so it's best to say no—and strictly enforce this decision as the parent.",
  "Lord Shang",
  terminal_event,
  0,
  1,
  -1,)

// Export the starting event
export const startingEvent = event_8b713344;
export { LifeEvent };
