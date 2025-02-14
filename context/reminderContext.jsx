import { createContext, useContext, useEffect, useState } from "react";

// -- context section --

// create a context
const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

// main component
export default function ReminderContextProvider({ children }) {
  // state for medication name
  const [medicationName, setMedicationName] = useState("");

  // dosage / pill count
  const [dosages, setDosages] = useState([]);

  // time picker
  const [reminderTime, setReminderTime] = useState([]);

  // track frequency for everyday
  const [frequency, setFrequency] = useState("");

  // track specific days for 'specificdays'
  const [specificDays, setSpecificDays] = useState([]);

  // track the compartment selection
  const [compartment, setCompartment] = useState("");

  // value pass to provider
  value = {
    medicationName,
    setMedicationName,
    dosages,
    setDosages,
    reminderTime,
    setReminderTime,
    frequency,
    setFrequency,
    specificDays,
    setSpecificDays,
    updateDosages: (newDosages) => setDosages(newDosages),
    compartment,
    setCompartment,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}
