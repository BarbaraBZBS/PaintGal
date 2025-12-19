"use client";
import { motion } from "motion/react";


export default function Feedback() {
  return (
    <main className="grid place-content-center text-[1.5rem] p-[4rem] mb-[2rem]">
      <h1 className="text-[2.5rem] mb-[3rem]">Feedback</h1>
      <p className="pt-[2rem]">
        Would you consider sharing your thoughts on our art shop’s latest
        collection?
      </p>
      <p>
        How do you feel about the variety of materials we offer for your
        projects?
      </p>
      <p>
        Did you find the layout of our art shop easy to navigate and explore?
      </p>
      <p>
        What do you think about the prices of our supplies compared to other
        stores?
      </p>
      <p>
        Would you recommend our art shop to friends who enjoy creative
        activities and hobbies?
      </p>
      <p className="pt-[2rem] text-[1.7rem]">
        If you have any suggestions or comments, please let us know, we would be
        happy to hear from you!
      </p>
      <h2 className="text-[2rem] pt-[2rem]">
        Please share your feedback below:
      </h2>

      <form
        className="grid grid-rows-[1fr_1fr_3fr_2fr] gap-[2rem] p-[2.5rem]"
        action="mailto:anmu@example.com"
        method="post"
        encType="text/plain"
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        />
        <textarea
          name="comment"
          placeholder="Your Comment..."
          rows={4}
          required
          className="bg-zinc-200 dark:bg-zinc-800 self-center rounded-3xl pl-4"
        />
        <div className="grid grid-cols-[1fr_1fr] place-items-center">
          <div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="reset"
              className="cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
            >
              Reset
            </motion.button>
          </div>
          <div className="">
            <motion.button
                whileTap={{ scale: 0.8 }}
            
              type="submit"
              className="cursor-pointer p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black"
            >
              Submit
            </motion.button>
          </div>
        </div>
      </form>
    </main>
  );
}
