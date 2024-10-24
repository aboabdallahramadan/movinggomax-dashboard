import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <div
    className="flex justify-center items-center"
    >
      <div style={{
        width:"700px",
        marginTop:"130px"
      }}>

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-wrap items-center">
            <div className="w-full">
              <div className="w-full p-4 sm:p-12.5 xl:p-15">
                <Signin />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
