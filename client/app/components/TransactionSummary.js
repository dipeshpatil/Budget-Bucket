import { View, Text } from "react-native";
import React from "react";

function getTransactionSummary(data = []) {
  let budget = 0;
  let balance = 0;

  for (let i = 0; i < data.length; i++) {
    const transaction = data[i];
    const { type, amount } = transaction;

    if (type === "Income") {
      budget += amount;
      balance += amount;
    } else {
      balance -= amount;
    }
  }

  return [budget, balance];
}

export default function TransactionSummary({ data }) {
  const [budget, balance] = getTransactionSummary(data);

  return (
    <View className="p-3 m-2 bg-white rounded-md">
      <View className="flex-row">
        <View className="flex-1 flex-col">
          <Text className="text-xl text-center">
            Budget: <Text className="text-green-500 font-bold">{budget}</Text>
          </Text>
        </View>

        <View className="flex-1 text-center">
          <Text className="text-xl text-center">
            Balance: <Text className="text-red-500 font-bold">{balance}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
