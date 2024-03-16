"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  useUser,
  useOrganization,
} from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const createFile = useMutation(api.files.createFile);
  const getFiles = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <div className="containere">
      <main className="flex flex-col items-center justify-between p-24 pb-4 md:pt-52">
        <div className="hero flex flex-col space-y-6 justify-center items-center">
          <p className="text-primary text-[10px] md:text-sm font-bold tracking-wide text-center">
            SECURE & COLLABORATIVE FILE STORAGE PLATFORM
          </p>
          <h1 className="font-[600] text-4xl md:text-5xl flex text-center leading-[56px]">
            Empower Teams with Secure <br /> File Sharing & Transform
            Collaboration
            <br /> Effortlessly
          </h1>
          <Button
            onClick={() => {
              if (!orgId) return;
              createFile({
                name: "Hello World",
                orgId,
              });
            }}
          >
            Click Me
          </Button>

          {getFiles?.map((data) => (
            <div key={data._id}>{data.name}</div>
          ))}
          <p className="text-[#3F4654] text-center text-sm md:text-lg">
            Say goodbye to outdated file management. Embrace a next-level <br />{" "}
            secure, collaborative & seamless sharing features by{" "}
            <span className="text-primary font-bold">Cloudfuse</span>.
          </p>

          <div className="flex justify-between items-center gap-9 md:flex-row flex-col">
            <SignedIn>
              <Link href={"/dashboard"}>
                <Button>Launch Cloudfuse</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="flex gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M8.3765 10.7769L10.326 5.3184C10.484 4.87596 11.1097 4.87596 11.2677 5.3184L13.2172 10.7769C13.2676 10.9181 13.3787 11.0292 13.5199 11.0796L18.9784 13.0291C19.4209 13.1871 19.4209 13.8128 18.9784 13.9708L13.5199 15.9203C13.3787 15.9707 13.2676 16.0818 13.2172 16.223L11.2677 21.6815C11.1097 22.124 10.484 22.124 10.326 21.6815L8.3765 16.223C8.32608 16.0818 8.21498 15.9707 8.0738 15.9203L2.61528 13.9708C2.17284 13.8128 2.17284 13.1871 2.61528 13.0291L8.0738 11.0796C8.21498 11.0292 8.32608 10.9181 8.3765 10.7769Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7969 0.75C17.2111 0.75 17.5469 1.08579 17.5469 1.5V3.25H19.2969C19.7111 3.25 20.0469 3.58579 20.0469 4C20.0469 4.41421 19.7111 4.75 19.2969 4.75H17.5469V6.5C17.5469 6.91421 17.2111 7.25 16.7969 7.25C16.3827 7.25 16.0469 6.91421 16.0469 6.5V4.75H14.2969C13.8827 4.75 13.5469 4.41421 13.5469 4C13.5469 3.58579 13.8827 3.25 14.2969 3.25H16.0469V1.5C16.0469 1.08579 16.3827 0.75 16.7969 0.75ZM21.5469 6.5C21.5469 6.08579 21.2111 5.75 20.7969 5.75C20.3827 5.75 20.0469 6.08579 20.0469 6.5V7.25H19.2969C18.8827 7.25 18.5469 7.58579 18.5469 8C18.5469 8.41421 18.8827 8.75 19.2969 8.75H20.0469V9.5C20.0469 9.91421 20.3827 10.25 20.7969 10.25C21.2111 10.25 21.5469 9.91421 21.5469 9.5V8.75H22.2969C22.7111 8.75 23.0469 8.41421 23.0469 8C23.0469 7.58579 22.7111 7.25 22.2969 7.25H21.5469V6.5ZM9.08281 11.0292L10.7969 6.22988L12.5109 11.0292C12.637 11.3821 12.9147 11.6599 13.2677 11.7859L18.067 13.5L13.2677 15.214C12.9147 15.3401 12.637 15.6178 12.5109 15.9708L10.7969 20.7701L9.08281 15.9708C8.95676 15.6178 8.679 15.3401 8.32605 15.214L3.52676 13.5L8.32605 11.7859C8.679 11.6599 8.95676 11.3821 9.08281 11.0292ZM11.974 5.06615C11.579 3.96005 10.0147 3.96004 9.61967 5.06615L7.71003 10.4131L2.36303 12.3228C1.25693 12.7178 1.25692 14.2821 2.36303 14.6771L7.71003 16.5868L9.61967 21.9338C10.0147 23.0399 11.579 23.0399 11.974 21.9338L13.8837 16.5868L19.2307 14.6771C20.3368 14.2821 20.3368 12.7178 19.2307 12.3228L13.8837 10.4131L11.974 5.06615Z"
                      fill="white"
                    />
                  </svg>{" "}
                  Sign up for free
                </Button>
              </SignUpButton>
            </SignedOut>

            <Button className="bg-white hover:bg-[#6b75894a] border-2 border-[#6b75894a] text-[#3f46548e] hover:text-[#3F4654] font-bold">
              See Cloudfuse in action
            </Button>
          </div>
        </div>

        <section className="highlights">
          <Image
            className="mx-auto mt-8 hidden md:block"
            src={"/highlights.png"}
            alt=""
            height={595.83}
            width={1430}
          ></Image>
        </section>
      </main>
      <section className="bg-[#EBDAFD] flex flex-col pb-4 p-8 md:p-36 pt-24 md:pt-52">
        <div className="flex flex-col md:flex-row justify-between md:space-x-44 items-center">
          <div className="flex flex-col md:w-1/3 gap-3">
            <p className="font-bold text-sm">FILE STORAGE PLATFORM</p>
            <h2 className="text-[#5F259E] text-2xl md:text-3xl font-bold">
              Your Storage hub, your way
            </h2>
          </div>

          <div className="flex flex-col md:w-2/3 gap-3">
            <p className="text-[#1F2534] text-sm">
              We protect your data with zero-knowledge encryption, the highest
              level of online security and privacy. This means that only the
              sender and the recipient have the keys needed to see, read, or
              listen to the data stored or shared on{" "}
              <span className="text-[#5F259E] font-bold">CloudFuse</span>.
            </p>
            <Button className="flex gap-2 bg-black w-fit">
              Explore CloudFuse
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M4.01562 10.5049H12.3931L8.73312 14.1649C8.44063 14.4574 8.44063 14.9374 8.73312 15.2299C9.02562 15.5224 9.49813 15.5224 9.79062 15.2299L14.7331 10.2874C15.0256 9.99494 15.0256 9.52244 14.7331 9.22994L9.79813 4.27992C9.50563 3.98742 9.03312 3.98742 8.74063 4.27992C8.44813 4.57242 8.44813 5.04492 8.74063 5.33742L12.3931 9.00494H4.01562C3.60312 9.00494 3.26562 9.34244 3.26562 9.75494C3.26562 10.1674 3.60312 10.5049 4.01562 10.5049Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
        <Image
          src={"/chrome-extension.png"}
          height={500}
          alt="chrome-extension"
          width={1252}
          className="mx-auto mt-8"
        />
        <div className="flex items-center pt-10 flex-wrap justify-between md:justify-start">
          <div className="flex flex-col w-full md:w-1/3 border-t-2 pt-3 border-[#6B7589] md:border-none md:pt-0 md:px-3">
            <h1 className="text-base md:text-lg text-[#111827] font-bold">
              Various Premium Plans
            </h1>
            <p className="text-sm md:text-base text-[#111827]">
              Based on your requirements you can choose your plans and share
              files with your organization
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/3 border-t-2 pt-2 border-[#6B7589] md:border-none md:pt-0 md:px-3">
            <h1 className="text-base md:text-lg text-[#111827] font-bold">
              Unlock the True Productivity
            </h1>
            <p className="text-sm md:text-base text-[#111827]">
              Share the files just by generating a shareable link in one go.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/3 border-t-2 pt-2 border-[#6B7589] md:border-none md:pt-0 md:px-3">
            <h1 className="text-base md:text-lg text-[#111827] font-bold">
              Set Priorities
            </h1>
            <p className="text-sm md:text-base text-[#111827]">
              You can set your priorities for your favorite files by starring
              them.
            </p>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="flex flex-col items-center justify-between p-8 md:p-24 pb-0 md:pt-52 relative">
        <div className="hero flex flex-col space-y-6 justify-center items-center">
          <p className="text-primary text-[10px] md:text-sm font-bold tracking-wide text-center">
            FILE STORAGE PLATFORM
          </p>
          <h1 className="font-[600] text-3xl md:text-5xl flex text-center leading-[48px] md:leading-[56px]">
            See all features
            <br /> Effortlessly
          </h1>

          <p className="text-[#3F4654] text-center text-sm md:text-lg">
            Privacy is not an option with{" "}
            <span className="text-primary font-bold">Cloudfuse</span>, it’s
            standard. That’s <br />
            because we believe that everyone should be able to store data <br />
            and communicate securely and privately online.
          </p>
        </div>

        <div className="relative pt-20">
          <Image
            src={"/features.png"}
            height={919}
            width={1000}
            alt="features"
          />
          <div className="w-[30%] md:w-80 h-72 md:h-100 bg-[#AD6DF4] absolute top-[5%] left-[60%] -z-10 blur-2xl opacity-30 overflow-hidden rounded-full"></div>
          <div className="w-[20%] md:w-80 h-72 md:h-80 bg-[#FF5FE4] absolute top-[60%] left-[3vw] -z-10 blur-2xl opacity-30 overflow-hidden rounded-full"></div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="flex flex-col items-center justify-between p-8 md:p-24  pb-0 md:pt-24 relative">
        <div className="flex flex-col space-y-6 justify-center items-center bg-footer-cta">
          <p className="text-[10px] md:text-sm font-bold tracking-wide text-center mt-4">
            GET STARTED WITH CLOUDFUSE
          </p>
          <h1 className="font-[600] text-3xl md:text-5xl flex text-center leading-[48px] md:leading-[56px]">
            Say goodbye to outdated <br />
            file management applications
          </h1>

          <p className="text-center text-sm md:text-lg">
            Embrace a next-level secure, collaborative & seamless sharing
            features by <span className="font-bold">Cloudfuse</span>,
          </p>

          <div className="flex justify-between items-center gap-9 md:flex-row flex-col">
            <SignedIn>
              <Link href={"/dashboard"}>
                <Button className="flex gap-x-2 bg-white font-bold hover:text-white text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M8.3765 11.5582L10.326 6.09965C10.484 5.65721 11.1097 5.65721 11.2677 6.09965L13.2172 11.5582C13.2676 11.6994 13.3787 11.8105 13.5199 11.8609L18.9784 13.8104C19.4209 13.9684 19.4209 14.5941 18.9784 14.7521L13.5199 16.7016C13.3787 16.752 13.2676 16.8631 13.2172 17.0043L11.2677 22.4628C11.1097 22.9053 10.484 22.9053 10.326 22.4628L8.3765 17.0043C8.32608 16.8631 8.21498 16.752 8.0738 16.7016L2.61528 14.7521C2.17284 14.5941 2.17284 13.9684 2.61528 13.8104L8.0738 11.8609C8.21498 11.8105 8.32608 11.6994 8.3765 11.5582Z"
                      fill="#111827"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7969 1.53125C17.2111 1.53125 17.5469 1.86704 17.5469 2.28125V4.03125H19.2969C19.7111 4.03125 20.0469 4.36704 20.0469 4.78125C20.0469 5.19546 19.7111 5.53125 19.2969 5.53125H17.5469V7.28125C17.5469 7.69546 17.2111 8.03125 16.7969 8.03125C16.3827 8.03125 16.0469 7.69546 16.0469 7.28125V5.53125H14.2969C13.8827 5.53125 13.5469 5.19546 13.5469 4.78125C13.5469 4.36704 13.8827 4.03125 14.2969 4.03125H16.0469V2.28125C16.0469 1.86704 16.3827 1.53125 16.7969 1.53125ZM21.5469 7.28125C21.5469 6.86704 21.2111 6.53125 20.7969 6.53125C20.3827 6.53125 20.0469 6.86704 20.0469 7.28125V8.03125H19.2969C18.8827 8.03125 18.5469 8.36704 18.5469 8.78125C18.5469 9.19546 18.8827 9.53125 19.2969 9.53125H20.0469V10.2812C20.0469 10.6955 20.3827 11.0312 20.7969 11.0312C21.2111 11.0312 21.5469 10.6955 21.5469 10.2812V9.53125H22.2969C22.7111 9.53125 23.0469 9.19546 23.0469 8.78125C23.0469 8.36704 22.7111 8.03125 22.2969 8.03125H21.5469V7.28125ZM9.08281 11.8104L10.7969 7.01113L12.5109 11.8104C12.637 12.1633 12.9147 12.4411 13.2677 12.5672L18.067 14.2812L13.2677 15.9952C12.9147 16.1213 12.637 16.3991 12.5109 16.7521L10.7969 21.5513L9.08281 16.7521C8.95676 16.3991 8.679 16.1213 8.32605 15.9952L3.52676 14.2812L8.32605 12.5672C8.679 12.4411 8.95676 12.1633 9.08281 11.8104ZM11.974 5.8474C11.579 4.7413 10.0147 4.74129 9.61967 5.8474L7.71003 11.1944L2.36303 13.104C1.25693 13.4991 1.25692 15.0633 2.36303 15.4584L7.71003 17.368L9.61967 22.715C10.0147 23.8211 11.579 23.8211 11.974 22.715L13.8837 17.368L19.2307 15.4584C20.3368 15.0633 20.3368 13.4991 19.2307 13.104L13.8837 11.1944L11.974 5.8474Z"
                      fill="#111827"
                    />
                  </svg>
                  Launch Cloudfuse
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="flex gap-x-2 bg-white text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M8.3765 11.5582L10.326 6.09965C10.484 5.65721 11.1097 5.65721 11.2677 6.09965L13.2172 11.5582C13.2676 11.6994 13.3787 11.8105 13.5199 11.8609L18.9784 13.8104C19.4209 13.9684 19.4209 14.5941 18.9784 14.7521L13.5199 16.7016C13.3787 16.752 13.2676 16.8631 13.2172 17.0043L11.2677 22.4628C11.1097 22.9053 10.484 22.9053 10.326 22.4628L8.3765 17.0043C8.32608 16.8631 8.21498 16.752 8.0738 16.7016L2.61528 14.7521C2.17284 14.5941 2.17284 13.9684 2.61528 13.8104L8.0738 11.8609C8.21498 11.8105 8.32608 11.6994 8.3765 11.5582Z"
                      fill="#111827"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7969 1.53125C17.2111 1.53125 17.5469 1.86704 17.5469 2.28125V4.03125H19.2969C19.7111 4.03125 20.0469 4.36704 20.0469 4.78125C20.0469 5.19546 19.7111 5.53125 19.2969 5.53125H17.5469V7.28125C17.5469 7.69546 17.2111 8.03125 16.7969 8.03125C16.3827 8.03125 16.0469 7.69546 16.0469 7.28125V5.53125H14.2969C13.8827 5.53125 13.5469 5.19546 13.5469 4.78125C13.5469 4.36704 13.8827 4.03125 14.2969 4.03125H16.0469V2.28125C16.0469 1.86704 16.3827 1.53125 16.7969 1.53125ZM21.5469 7.28125C21.5469 6.86704 21.2111 6.53125 20.7969 6.53125C20.3827 6.53125 20.0469 6.86704 20.0469 7.28125V8.03125H19.2969C18.8827 8.03125 18.5469 8.36704 18.5469 8.78125C18.5469 9.19546 18.8827 9.53125 19.2969 9.53125H20.0469V10.2812C20.0469 10.6955 20.3827 11.0312 20.7969 11.0312C21.2111 11.0312 21.5469 10.6955 21.5469 10.2812V9.53125H22.2969C22.7111 9.53125 23.0469 9.19546 23.0469 8.78125C23.0469 8.36704 22.7111 8.03125 22.2969 8.03125H21.5469V7.28125ZM9.08281 11.8104L10.7969 7.01113L12.5109 11.8104C12.637 12.1633 12.9147 12.4411 13.2677 12.5672L18.067 14.2812L13.2677 15.9952C12.9147 16.1213 12.637 16.3991 12.5109 16.7521L10.7969 21.5513L9.08281 16.7521C8.95676 16.3991 8.679 16.1213 8.32605 15.9952L3.52676 14.2812L8.32605 12.5672C8.679 12.4411 8.95676 12.1633 9.08281 11.8104ZM11.974 5.8474C11.579 4.7413 10.0147 4.74129 9.61967 5.8474L7.71003 11.1944L2.36303 13.104C1.25693 13.4991 1.25692 15.0633 2.36303 15.4584L7.71003 17.368L9.61967 22.715C10.0147 23.8211 11.579 23.8211 11.974 22.715L13.8837 17.368L19.2307 15.4584C20.3368 15.0633 20.3368 13.4991 19.2307 13.104L13.8837 11.1944L11.974 5.8474Z"
                      fill="#111827"
                    />
                  </svg>
                  Sign up for free
                </Button>
              </SignUpButton>
            </SignedOut>

            <Button className="bg-transparent hover:bg-gray-100 border-2 border-white text-white hover:text-black font-bold">
              See Cloudfuse in action
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="flex flex-col items-center justify-between p-8 md:p-24 pb-0  md:pb-0 md:pt-24 relative">
        <div className="flex flex-col md:flex-row justify-between items-center border-t-2 p-4 border-b-2">
          <div>
            <Image src={"/logo.png"} width={257} height={42} alt="logo" />
            <p className="w-full md:w-1/4 mt-2">
              Cloudfuse provides a robust platform for storing, sharing, and
              managing your data with robust security features and role-based
              access control.
            </p>
          </div>

          <div className="mt-2">
            <SignedIn>
              <Link href={"/dashboard"}>
                <Button>Launch Cloudfuse</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="flex gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M8.3765 10.7769L10.326 5.3184C10.484 4.87596 11.1097 4.87596 11.2677 5.3184L13.2172 10.7769C13.2676 10.9181 13.3787 11.0292 13.5199 11.0796L18.9784 13.0291C19.4209 13.1871 19.4209 13.8128 18.9784 13.9708L13.5199 15.9203C13.3787 15.9707 13.2676 16.0818 13.2172 16.223L11.2677 21.6815C11.1097 22.124 10.484 22.124 10.326 21.6815L8.3765 16.223C8.32608 16.0818 8.21498 15.9707 8.0738 15.9203L2.61528 13.9708C2.17284 13.8128 2.17284 13.1871 2.61528 13.0291L8.0738 11.0796C8.21498 11.0292 8.32608 10.9181 8.3765 10.7769Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7969 0.75C17.2111 0.75 17.5469 1.08579 17.5469 1.5V3.25H19.2969C19.7111 3.25 20.0469 3.58579 20.0469 4C20.0469 4.41421 19.7111 4.75 19.2969 4.75H17.5469V6.5C17.5469 6.91421 17.2111 7.25 16.7969 7.25C16.3827 7.25 16.0469 6.91421 16.0469 6.5V4.75H14.2969C13.8827 4.75 13.5469 4.41421 13.5469 4C13.5469 3.58579 13.8827 3.25 14.2969 3.25H16.0469V1.5C16.0469 1.08579 16.3827 0.75 16.7969 0.75ZM21.5469 6.5C21.5469 6.08579 21.2111 5.75 20.7969 5.75C20.3827 5.75 20.0469 6.08579 20.0469 6.5V7.25H19.2969C18.8827 7.25 18.5469 7.58579 18.5469 8C18.5469 8.41421 18.8827 8.75 19.2969 8.75H20.0469V9.5C20.0469 9.91421 20.3827 10.25 20.7969 10.25C21.2111 10.25 21.5469 9.91421 21.5469 9.5V8.75H22.2969C22.7111 8.75 23.0469 8.41421 23.0469 8C23.0469 7.58579 22.7111 7.25 22.2969 7.25H21.5469V6.5ZM9.08281 11.0292L10.7969 6.22988L12.5109 11.0292C12.637 11.3821 12.9147 11.6599 13.2677 11.7859L18.067 13.5L13.2677 15.214C12.9147 15.3401 12.637 15.6178 12.5109 15.9708L10.7969 20.7701L9.08281 15.9708C8.95676 15.6178 8.679 15.3401 8.32605 15.214L3.52676 13.5L8.32605 11.7859C8.679 11.6599 8.95676 11.3821 9.08281 11.0292ZM11.974 5.06615C11.579 3.96005 10.0147 3.96004 9.61967 5.06615L7.71003 10.4131L2.36303 12.3228C1.25693 12.7178 1.25692 14.2821 2.36303 14.6771L7.71003 16.5868L9.61967 21.9338C10.0147 23.0399 11.579 23.0399 11.974 21.9338L13.8837 16.5868L19.2307 14.6771C20.3368 14.2821 20.3368 12.7178 19.2307 12.3228L13.8837 10.4131L11.974 5.06615Z"
                      fill="white"
                    />
                  </svg>{" "}
                  Sign up for free
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
        <footer className="flex justify-between w-full flex-col space-y-3 md:space-y-0 md:flex-row items-center p-5">
          <div className="flex gap-2 fle-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.91154 3.65088H8.08847C8.53807 6.33088 10.6533 8.44608 13.3333 8.89575V9.07268C10.6533 9.52235 8.53807 11.6375 8.08847 14.3175H7.91154C7.46194 11.6375 5.34668 9.52235 2.66667 9.07268V8.89575C5.34668 8.44608 7.46194 6.33088 7.91154 3.65088Z"
                fill="#AD6DF4"
              />
            </svg>
            <p>Copyright © 2024 Cloudfuse. All rights reserved.</p>
          </div>
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6826 16.5H12.3326L8.32014 10.65L3.29514 16.5H2.02014L7.75764 9.825L2.02014 1.5H6.37014L10.1576 7.0125L14.9201 1.5H16.1951L10.7576 7.8375L16.6826 16.5ZM14.9201 15.5625H12.9326L3.78264 2.475H5.77014L14.9201 15.5625Z"
                fill="#6B7589"
              />
            </svg>
            <p>/</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                opacity="0.2"
                d="M13.1594 2.25H6.40942C5.51432 2.25 4.65587 2.60558 4.02294 3.23851C3.39001 3.87145 3.03442 4.7299 3.03442 5.625V12.375C3.03442 13.2701 3.39001 14.1286 4.02294 14.7615C4.65587 15.3944 5.51432 15.75 6.40942 15.75H13.1594C14.0545 15.75 14.913 15.3944 15.5459 14.7615C16.1788 14.1286 16.5344 13.2701 16.5344 12.375V5.625C16.5344 4.7299 16.1788 3.87145 15.5459 3.23851C14.913 2.60558 14.0545 2.25 13.1594 2.25ZM9.78442 11.8125C9.22815 11.8125 8.6844 11.6476 8.22188 11.3385C7.75937 11.0295 7.39888 10.5902 7.18601 10.0763C6.97314 9.56235 6.91744 8.99685 7.02596 8.4513C7.13449 7.90575 7.40235 7.4046 7.79569 7.01126C8.18902 6.61792 8.69017 6.35006 9.23572 6.24154C9.78127 6.13302 10.3468 6.18871 10.8607 6.40159C11.3746 6.61446 11.8139 6.97495 12.1229 7.43746C12.432 7.89997 12.5969 8.44373 12.5969 9C12.5969 9.74595 12.3006 10.4613 11.7732 10.9888C11.2457 11.5162 10.5304 11.8125 9.78442 11.8125Z"
                fill="#6B7589"
              />
              <path
                d="M13.1594 1.6875H6.40942C5.36548 1.68862 4.36461 2.10382 3.62642 2.842C2.88824 3.58019 2.47304 4.58105 2.47192 5.625V12.375C2.47304 13.4189 2.88824 14.4198 3.62642 15.158C4.36461 15.8962 5.36548 16.3114 6.40942 16.3125H13.1594C14.2033 16.3114 15.2042 15.8962 15.9424 15.158C16.6806 14.4198 17.0958 13.4189 17.0969 12.375V5.625C17.0958 4.58105 16.6806 3.58019 15.9424 2.842C15.2042 2.10382 14.2033 1.68862 13.1594 1.6875ZM15.9719 12.375C15.9719 13.1209 15.6756 13.8363 15.1482 14.3638C14.6207 14.8912 13.9054 15.1875 13.1594 15.1875H6.40942C5.6635 15.1875 4.94813 14.8912 4.42069 14.3638C3.89324 13.8363 3.59692 13.1209 3.59692 12.375V5.625C3.59692 4.87908 3.89324 4.16371 4.42069 3.63626C4.94813 3.10882 5.6635 2.8125 6.40942 2.8125H13.1594C13.9054 2.8125 14.6207 3.10882 15.1482 3.63626C15.6756 4.16371 15.9719 4.87908 15.9719 5.625V12.375ZM9.78442 5.625C9.11692 5.625 8.46442 5.82294 7.90937 6.19379C7.35436 6.56464 6.92178 7.09174 6.66633 7.70842C6.41089 8.32515 6.34405 9.00375 6.47428 9.65843C6.6045 10.3131 6.92593 10.9144 7.39794 11.3865C7.86994 11.8585 8.47132 12.1799 9.126 12.3101C9.78067 12.4404 10.4593 12.3736 11.076 12.1181C11.6926 11.8627 12.2197 11.4301 12.5906 10.8751C12.9615 10.32 13.1594 9.6675 13.1594 9C13.1585 8.10518 12.8026 7.24727 12.1699 6.61454C11.5372 5.98181 10.6792 5.62593 9.78442 5.625ZM9.78442 11.25C9.33945 11.25 8.90437 11.1181 8.5344 10.8708C8.16438 10.6236 7.87599 10.2722 7.70569 9.861C7.5354 9.44992 7.49084 8.99752 7.57765 8.56102C7.66447 8.1246 7.87876 7.72365 8.19343 7.40901C8.50807 7.09434 8.90902 6.88005 9.34545 6.79323C9.78195 6.70642 10.2343 6.75098 10.6454 6.92127C11.0566 7.09157 11.408 7.37995 11.6552 7.74997C11.9025 8.11995 12.0344 8.55503 12.0344 9C12.0344 9.5967 11.7973 10.169 11.3754 10.591C10.9534 11.0129 10.3811 11.25 9.78442 11.25ZM14.2844 5.34375C14.2844 5.51062 14.2349 5.67376 14.1422 5.81252C14.0495 5.95126 13.9177 6.05941 13.7635 6.12327C13.6094 6.18713 13.4398 6.20384 13.276 6.17129C13.1124 6.13874 12.962 6.05837 12.844 5.94037C12.7261 5.82237 12.6457 5.67203 12.6131 5.50836C12.5806 5.34469 12.5973 5.17504 12.6611 5.02086C12.725 4.86668 12.8332 4.73491 12.9719 4.6422C13.1107 4.54948 13.2738 4.5 13.4407 4.5C13.6645 4.5 13.879 4.5889 14.0373 4.74713C14.1955 4.90536 14.2844 5.11997 14.2844 5.34375Z"
                fill="#6B7589"
              />
            </svg>
            <p>/</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                opacity="0.2"
                d="M15.7986 2.8125V15.1875C15.7986 15.3367 15.7393 15.4798 15.6338 15.5852C15.5284 15.6908 15.3853 15.75 15.2361 15.75H2.86108C2.7119 15.75 2.56882 15.6908 2.46334 15.5852C2.35785 15.4798 2.29858 15.3367 2.29858 15.1875V2.8125C2.29858 2.66332 2.35785 2.52024 2.46334 2.41475C2.56882 2.30927 2.7119 2.25 2.86108 2.25H15.2361C15.3853 2.25 15.5284 2.30927 15.6338 2.41475C15.7393 2.52024 15.7986 2.66332 15.7986 2.8125Z"
                fill="#6B7589"
              />
              <path
                d="M15.2361 1.6875H2.86108C2.56272 1.6875 2.27656 1.80603 2.06559 2.01701C1.85461 2.22798 1.73608 2.51414 1.73608 2.8125V15.1875C1.73608 15.4859 1.85461 15.772 2.06559 15.983C2.27656 16.194 2.56272 16.3125 2.86108 16.3125H15.2361C15.5344 16.3125 15.8206 16.194 16.0316 15.983C16.2426 15.772 16.3611 15.4859 16.3611 15.1875V2.8125C16.3611 2.51414 16.2426 2.22798 16.0316 2.01701C15.8206 1.80603 15.5344 1.6875 15.2361 1.6875ZM15.2361 15.1875H2.86108V2.8125H15.2361V15.1875ZM6.79858 7.875V12.375C6.79858 12.5242 6.73932 12.6673 6.63383 12.7727C6.52834 12.8783 6.38527 12.9375 6.23608 12.9375C6.0869 12.9375 5.94382 12.8783 5.83834 12.7727C5.73285 12.6673 5.67358 12.5242 5.67358 12.375V7.875C5.67358 7.72582 5.73285 7.58273 5.83834 7.47725C5.94382 7.37177 6.0869 7.3125 6.23608 7.3125C6.38527 7.3125 6.52834 7.37177 6.63383 7.47725C6.73932 7.58273 6.79858 7.72582 6.79858 7.875ZM12.9861 9.84375V12.375C12.9861 12.5242 12.9268 12.6673 12.8213 12.7727C12.7159 12.8783 12.5728 12.9375 12.4236 12.9375C12.2744 12.9375 12.1313 12.8783 12.0259 12.7727C11.9203 12.6673 11.8611 12.5242 11.8611 12.375V9.84375C11.8611 9.47078 11.713 9.1131 11.4492 8.8494C11.1855 8.58563 10.8278 8.4375 10.4548 8.4375C10.0819 8.4375 9.72418 8.58563 9.46048 8.8494C9.19671 9.1131 9.04858 9.47078 9.04858 9.84375V12.375C9.04858 12.5242 8.98933 12.6673 8.88381 12.7727C8.77836 12.8783 8.63526 12.9375 8.48608 12.9375C8.33691 12.9375 8.19381 12.8783 8.08836 12.7727C7.98283 12.6673 7.92358 12.5242 7.92358 12.375V7.875C7.92426 7.73723 7.97556 7.60448 8.06758 7.50195C8.15968 7.39947 8.28613 7.33433 8.42308 7.31889C8.55996 7.30345 8.69781 7.33881 8.81038 7.41824C8.92296 7.49768 9.00246 7.61565 9.03381 7.74983C9.41436 7.49171 9.85798 7.3421 10.3171 7.31708C10.7763 7.29207 11.2336 7.39259 11.6398 7.60785C12.0462 7.8231 12.3862 8.145 12.6234 8.5389C12.8605 8.93287 12.9859 9.38392 12.9861 9.84375ZM7.07983 5.90625C7.07983 6.07312 7.03035 6.23626 6.93763 6.37502C6.84493 6.51376 6.71315 6.62191 6.55897 6.68577C6.4048 6.74963 6.23515 6.76634 6.07147 6.73379C5.9078 6.70124 5.75746 6.62087 5.63946 6.50287C5.52146 6.38487 5.4411 6.23453 5.40855 6.07086C5.37599 5.90719 5.3927 5.73754 5.45656 5.58336C5.52042 5.42918 5.62857 5.29741 5.76732 5.2047C5.90608 5.11198 6.06921 5.0625 6.23608 5.0625C6.45986 5.0625 6.67447 5.1514 6.83271 5.30963C6.99094 5.46786 7.07983 5.68247 7.07983 5.90625Z"
                fill="#6B7589"
              />
            </svg>
          </div>
        </footer>
      </section>
    </div>
  );
}
