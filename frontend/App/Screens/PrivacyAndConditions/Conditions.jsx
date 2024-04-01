import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Conditions() {
  const termsAndConditions = `
    A Terms & Conditions document for a website is an agreement the website makes with its users about how to use the site properly, as well as the obligations and responsibilities of each. 

    Websites, especially commercial websites, have a portion of the site devoted to Terms & Conditions, because it’s the most important document for letting site users know what is expected of them. For owner/operators running any kind of business or personal website that allows user interaction, it’s a good idea to have a clearly laid out document with all the Terms & Conditions required. 

    One of the primary functions of a Terms & Conditions document is to outline what will happen in a variety of different possible situations, including if the user breaks the rules and must have his/her account terminated. If the user goes in knowing what to expect, it is less likely that there will be problems between the user and the website down the road. 

    The Terms & Conditions document on any website creates a legally binding set of rules for the user, as well as, in most cases, the website owner. It’s a place to set up expectations for each of the parties and ensure that the use of the website runs smoothly for both. These Terms & Conditions outline the basic responsibilities for a user to a website, including what the user can and can’t do, what happens in case of a dispute, and how the user’s account may be terminated if need be. This document should be used for an owner/operator just setting up a new business or personal website, or when an owner/operator wishes to update the rules on their current website.
  `;

  const paragraphs = termsAndConditions.split('\n').map((paragraph, index) => (
    <Text key={index} style={styles.text}>{paragraph.trim()}</Text>
  ));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Terms & Conditions</Text>
        {paragraphs}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
