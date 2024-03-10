"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Dialog } from "primereact/dialog";
import "./lienhe.css";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
const LienHe = () => {
  const op = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const header = (
    <div className="flex justify-center align-items-center">
      <h2 className="text-[20px] font-[700] opacity-[0.8]">Chat với Admin</h2>
    </div>
  );
  return (
    <>
      <div
        className="shadow-6 cursor-pointer flex justify-center items-center justify-content-center w-[60px] h-[60px] border-circle bg-[#eac93d] border-solid border-2 border-[#fff]  fixed bottom-[100px] right-4"
        onClick={(e) => setVisible(true)}
      >
        <div>
          <i className="pi pi-comments flex justify-center text-[#fff]"></i>
          <p className="flex justify-center text-[#fff] text-[13px]">Liên hệ</p>
        </div>
      </div>
      <Dialog
        header={localStorage.getItem("role") !== "ADMIN" ? header : ""}
        visible={visible}
        position={"bottom-right"}
        style={{ width: "30vw", height: "70vh" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        modal={false}
        className="lienhe"
      >
        {localStorage.getItem("role") === "ADMIN" && (
          <>
            <div className="h-full w-full flex justify-center align-items-center">
              <Button
                label="Mở Tin nhắn"
                className="bg-[#EF4444] text-[#fff] w-[40%] h-3rem"
                onClick={() => router.push("/admin")}
              />
            </div>
          </>
        )}
        {localStorage.getItem("role") !== "ADMIN" && (
          <>
            <ChatEngine
              // height="calc(100vh - 212px)"
              projectID="2f9518a5-9f13-4be0-9e34-2eda4e91c9ef"
              userName={localStorage.getItem("username")}
              userSecret={"123456"}
              renderNewMessageForm={() => <MessageFormSocial />}
            />
          </>
        )}
      </Dialog>
    </>
  );
};
export default LienHe;
