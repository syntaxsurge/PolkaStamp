"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockNumber } from "@/hooks/use-block-number";
import { WsEvent } from "polkadot-api/ws-provider/web";
import { useMemo, useState } from "react";
import { useLightClientApi } from "@/providers/lightclient-api-provider";

export function ChainInfo() {
  const { connectionStatus, activeChain } = useLightClientApi();
  const [isOpen, setIsOpen] = useState(false);
  const blockNumber = useBlockNumber();

  /** Determine connection status without waiting for the first block. */
  const status: "connected" | "error" | "connecting" =
    connectionStatus?.type === WsEvent.CONNECTED
      ? "connected"
      : connectionStatus?.type === WsEvent.ERROR ||
        connectionStatus?.type === WsEvent.CLOSE
        ? "error"
        : "connecting";

  /** Render-friendly label for the transport in use. */
  const connectionMethod =
    activeChain?.key === "localnode" ? "WebSocket" : "lightclient";

  const Trigger = useMemo(() => {
    return (
      <div className="tabular-nums font-light h-6 border-foreground/20 border rounded-md px-2 text-[12px] cursor-default flex items-center gap-1">
        {status === "connected" ? (
          <span className="block rounded-full w-2 h-2 bg-green-400 animate-pulse" />
        ) : status === "error" ? (
          <span className="block rounded-full w-2.5 h-2.5 bg-red-400" />
        ) : (
          <span className="block rounded-full w-2 h-2 bg-yellow-400 animate-pulse" />
        )}
        {status === "connecting" && (
          <span className="whitespace-nowrap">{`connecting to ${activeChain?.name} via ${connectionMethod}`}</span>
        )}
        {status === "connected" && blockNumber !== null && (
          <span className="ml-1 text-[10px]">{`#${blockNumber}`}</span>
        )}
      </div>
    );
  }, [status, blockNumber, activeChain?.name, connectionMethod]);

  const Content = useMemo(() => {
    if (status === "connected") {
      return (
        <>
          connected to <b>{activeChain?.name}</b> via {connectionMethod}
        </>
      );
    }
    if (status === "error") {
      return (
        <>
          error:{" "}
          {connectionStatus?.type === WsEvent.ERROR
            ? "Connection error"
            : "Connection closed"}
        </>
      );
    }
    return <>connecting to {activeChain?.name} via {connectionMethod}</>;
  }, [status, activeChain?.name, connectionStatus, connectionMethod]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger
          asChild
          className="flex items-center fixed bottom-4 right-4"
        >
          {Trigger}
        </TooltipTrigger>
        <TooltipContent side="right">
          {Content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}