import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Transactions from "../components/Transactions";
import TransactionSummary from "../components/TransactionSummary";
import transactionData from "../data/transactions.json";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View className="flex-row items-center mx-2 space-x-2">
        <View className="flex-1">
          <Text className="font-bold p-1 text-xl">Summary</Text>
        </View>
      </View>

      <TransactionSummary data={transactionData} />

      <View className="flex-row items-center mx-2 space-x-2">
        <View className="flex-1">
          <Text className="font-bold p-1 text-xl">Transactions</Text>
        </View>
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Transactions />
      </ScrollView>
    </SafeAreaView>
  );
}
