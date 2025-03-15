import React from "react";
import { Spinner } from "@heroui/react";

export const LoaderComponent = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center">
        {/* <Spinner
          classNames={{ label: "text-white mt-4 text-xl" }}
          label="Loading..."
          variant="wave"
          size="xl"
          color="success"
        /> */}
        <Spinner
          style={{ transform: "scale(2.5)" }}
          classNames={{ label: "text-foreground mt-4" }}
          label={message}
          variant="wave"
          size="lg"
          color="white"
        />
      </div>
    </div>
  );
};
