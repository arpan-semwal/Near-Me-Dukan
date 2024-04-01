import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Privacy() {
  const textContent = `
    How to use this document
    
    These Terms & Conditions outline the basic responsibilities for a user to a website, including what the user can and can’t do, what happens in case of a dispute, and how the user’s account may be terminated if need be. This document should be used for an owner/operator just setting up a new business or personal website, or when an owner/operator wishes to update the rules on their current website. 

    Within this document, the operator can choose several different models for what the website does, such as whether it sells products or services, gives professional advice or lets other users post content like pictures, video, or status updates. It also addresses what happens if the user does anything to harm the website, like violates the intellectual property rights of the owner/operator. 

    Importantly, in these Terms & Conditions, the owner/operator can choose what state the business is primarily located in, which will apply the law of that state to this document. After filling out this document, it should be posted to its own separate page on a website. Ideally, that page will be linked to from the homepage under the phrase “Terms & Conditions.” 

    Applicable law
    
    Although there is not one set of laws or regulations outlining what must be contained in the Terms & Conditions for a website, website terms and care broadly governed under the Indian Contract Act, 1872 and the Information Technology Act, 2000.
  `;

  const paragraphs = textContent.split('\n\n').map((paragraph, index) => (
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
