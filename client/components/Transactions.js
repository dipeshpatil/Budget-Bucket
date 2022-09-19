import React from "react";
import { View } from "react-native";

import TransactionCard from "./TransactionCard";

import transactionsData from "./../data/transactions.json";

export default function Transactions() {
  return (
    <View className="space-x-2 p-1 flex-col-reverse">
      {transactionsData.map((transaction) => {
        const { id, category, type, description, amount } = transaction;
        
        return (
          <TransactionCard
            key={id}
            category={category}
            amount={amount}
            type={type}
            description={description}
          />
        );
      })}
    </View>
  );
}
