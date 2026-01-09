import { useState, useEffect, useCallback } from "react";
import type { AuctionObject } from "@/data/auctionData";

export interface UserBid {
  objectId: number;
  objectName: string;
  objectImage: string;
  category: string;
  bidAmount: number;
  bidTime: string;
  currentHighestBid: number;
  isWinning: boolean;
}

const STORAGE_KEY = "lecomptoir_user_bids";

export const useUserBids = () => {
  const [userBids, setUserBids] = useState<UserBid[]>([]);

  // Load bids from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUserBids(JSON.parse(stored));
      } catch {
        setUserBids([]);
      }
    }
  }, []);

  // Save to localStorage whenever userBids changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userBids));
  }, [userBids]);

  const addBid = useCallback((object: AuctionObject, amount: number) => {
    const now = new Date();
    const timeString = now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setUserBids((prev) => {
      // Check if user already bid on this object
      const existingIndex = prev.findIndex((b) => b.objectId === object.id);
      
      const newBid: UserBid = {
        objectId: object.id,
        objectName: object.name,
        objectImage: object.image,
        category: object.category,
        bidAmount: amount,
        bidTime: timeString,
        currentHighestBid: amount, // User just bid, so they're the highest
        isWinning: true,
      };

      if (existingIndex >= 0) {
        // Update existing bid
        const updated = [...prev];
        updated[existingIndex] = newBid;
        return updated;
      } else {
        // Add new bid
        return [...prev, newBid];
      }
    });
  }, []);

  const clearBids = useCallback(() => {
    setUserBids([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getTotalBidAmount = useCallback(() => {
    return userBids.reduce((sum, bid) => sum + bid.bidAmount, 0);
  }, [userBids]);

  const getWinningBids = useCallback(() => {
    return userBids.filter((bid) => bid.isWinning);
  }, [userBids]);

  return {
    userBids,
    addBid,
    clearBids,
    getTotalBidAmount,
    getWinningBids,
  };
};
