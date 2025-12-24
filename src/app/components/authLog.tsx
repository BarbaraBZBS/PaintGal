"use client";
import React from "react";
import Link from "next/link";
import { motion, Variant, Transition } from "motion/react";
import { doLogout } from "../actions";

type PathProps = {
  variants: {
    closed: Variant;
    open: Variant;
  };
  d?: string;
  transition?: Transition | undefined;
};

type OpenProp = {
  toggle?: React.MouseEventHandler;
  isOpen?: boolean;
};

type AuthLogProps = OpenProp & {
  status?: string;
  privilege?: string;
};

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const linkVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export const AuthLog: React.FC<AuthLogProps> = ({
  toggle,
  isOpen,
  status,
  privilege,
}) => {
  return (
    <>
      {privilege === "user" ? (
        <>
          <div className="hidden md:grid">
            {status === "notAuthenticated" ? (
              <Link href="/SignIn">Login</Link>
            ) : (
              <form action={doLogout}>
                <button
                  className="cursor-pointer"
                  type="submit"
                >
                  Logout
                </button>
              </form>
              //<Link href="/SignOut">Logout</Link>
            )}
          </div>

          <div className="md:hidden h-full grid place-items-center relative">
            <button
              onClick={toggle}
              aria-label="Toggle Menu"
              title="Toggle Menu"
              className="cursor-pointer"
            >
              {/* modified for some dark mode lightness on some browsers (Safari Mac) -23 23, 0 0 23 23-  34 40*/}
              <svg
                width="23"
                height="34"
                viewBox="0 0 23 40"
              >
                <Path
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <ul className="h-[15rem] w-[20vw] right-[2.5vw] grid absolute z-50 place-items-center rounded-b-lg text-[1.4rem]">
              {status === "notAuthenticated" ? (
                <motion.li
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="list-none md:hidden"
                >
                  <Link
                    href="/SignIn"
                    onClick={toggle}
                  >
                    Login
                  </Link>
                </motion.li>
              ) : (
                <motion.li
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="list-none md:hidden"
                >
                  {/*<Link
                    href="/SignOut"
                    onClick={toggle}
                  >
                    Logout
                  </Link>*/}
                  <form action={doLogout}>
                    <button
                      className="cursor-pointer"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>
                </motion.li>
              )}
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/"
                  onClick={toggle}
                >
                  Home
                </Link>
              </motion.li>
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/About"
                  onClick={toggle}
                >
                  About
                </Link>
              </motion.li>
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/UserInfo"
                  onClick={toggle}
                >
                  Account
                </Link>
              </motion.li>
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="hidden md:grid">
            {status === "notAuthenticated" ? (
              <Link href="/SignIn">Login</Link>
            ) : (
              <form action={doLogout}>
                <button
                  className="cursor-pointer"
                  type="submit"
                >
                  Logout
                </button>
              </form>
              //<Link href="/SignOut">Logout</Link>
            )}
          </div>

          <div className="md:hidden h-full grid place-items-center relative">
            <button
              onClick={toggle}
              aria-label="Toggle Menu"
              title="Toggle Menu"
              className="cursor-pointer"
            >
              {/* modified for some dark mode lightness on some browsers (Safari Mac) -23 23, 0 0 23 23-  34 40*/}
              <svg
                width="23"
                height="34"
                viewBox="0 0 23 40"
              >
                <Path
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <ul className="h-[15rem] w-[20vw] right-[2.5vw] grid z-50 absolute place-items-center rounded-b-lg text-[1.4rem]">
              {status === "notAuthenticated" ? (
                <motion.li
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="list-none md:hidden"
                >
                  <Link
                    href="/SignIn"
                    onClick={toggle}
                  >
                    Login
                  </Link>
                </motion.li>
              ) : (
                <motion.li
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="list-none md:hidden"
                >
                  {/*<Link
                    href="/SignOut"
                    onClick={toggle}
                  >
                    Logout
                  </Link>*/}
                  <form action={doLogout}>
                    <button
                      className="cursor-pointer"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>
                </motion.li>
              )}
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/"
                  onClick={toggle}
                >
                  Home
                </Link>
              </motion.li>

              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/Dashboard"
                  onClick={toggle}
                >
                  Dashboard
                </Link>
              </motion.li>
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="list-none md:hidden"
              >
                <Link
                  href="/UserInfo"
                  onClick={toggle}
                >
                  Account
                </Link>
              </motion.li>
            </ul>
          )}
        </>
      )}
    </>
  );
};
