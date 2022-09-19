import React from "react";
import { View, Text } from "react-native";
import clsx from "clsx";
import moment from "moment";

export default function TransactionCard({
  category,
  date,
  type,
  description,
  amount,
}) {
  const transactionType = type == "Spend";

  const parsedDate = moment(date);
  const dateComponent = parsedDate.utc().format("Do MMM");

  return (
    <View className="p-3 bg-white m-1 rounded-md">
      <View className="flex-row">
        <View className="flex-col flex-1">
          <Text className="flex-1 text-xl">{category}</Text>
          {description && <Text className="flex-1 text-md">{description}</Text>}
        </View>

        <View className="flex-col">
          <Text className="text-xs">{dateComponent}</Text>
          <Text
            className={clsx([
              "text-xl",
              "font-bold",
              transactionType ? "text-red-500" : "text-green-500",
            ])}
          >
            {`${transactionType ? "-" : "+"} ${amount}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
