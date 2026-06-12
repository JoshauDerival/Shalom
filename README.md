# Shalom

Shalom is a mobile care-tracking application designed to help caregivers document and monitor neurological episodes in real time. The app was created to make it easy to track seizures, non-verbal episodes, mobility issues, and fainting episodes with one hand during stressful situations.

The goal of Shalom is to provide accurate records that can be shared with doctors, neurologists, caregivers, and family members to better understand patterns and improve care.

---

## Features

### Episode Tracking

Track an episode with a single tap.

* Start Episode button
* End Episode button
* Live episode timer
* One-handed operation
* Clean and minimal interface

### Stage Tracking

Track multiple episode stages simultaneously.

Current supported stages:

* Seizure
* Non-verbal
* Mobility Issue
* Fainting

Users can toggle stages on and off during an episode. Every stage change is logged with a timestamp.

### Episode History

All completed episodes are stored locally on the device.

For each episode Shalom records:

* Start time
* End time
* Total duration
* Stage timeline
* Stage durations
* Notes
* Episode title

### Episode Details

Each saved episode includes:

* Episode name
* Total duration
* Start and end timestamps
* Detailed stage timeline
* Stage duration summary
* Caregiver notes

### Notes System

Caregivers can add detailed notes to each episode, including:

* Symptoms observed
* Recovery details
* Environmental factors
* Additional observations

### Statistics Dashboard

Shalom automatically tracks:

* Total number of episodes
* Average episode duration
* Longest recorded episode

### Local Data Storage

Episode data is stored locally using AsyncStorage.

Benefits:

* Works without internet
* Data persists between app launches
* Fast access to records
* No cloud account required

### Report Sharing

Generate and share episode reports.

Reports include:

* Episode information
* Duration
* Stage durations
* Stage timeline
* Caregiver notes

Reports can be shared through the device's native sharing system.

### Safety Features

* Delete confirmation dialog
* Episode editing
* Persistent storage
* Protected episode management

---

## Technology Stack

### Frontend

* React Native
* Expo

### Storage

* AsyncStorage

### File Sharing

* Expo Sharing
* Expo File System

### Development Tools

* JavaScript
* Git
* GitHub

---

## Current Version

### Version 1.0.0

Implemented Features:

* Episode timer
* Stage tracking
* Episode history
* Episode details page
* Notes system
* Episode title editing
* Statistics dashboard
* Local storage
* Report sharing
* Delete confirmation

---

## Future Roadmap

Planned features include:

### Symptom Tracking

Additional symptom tags such as:

* Unresponsive
* Confused
* Shaking
* Slurred Speech
* Fell
* Vomiting
* Injured

### Advanced Statistics

* Most common episode type
* Weekly trends
* Monthly trends
* Average stage durations

### Search and Filtering

* Search episodes
* Filter by date
* Filter by symptom
* Filter by episode type

### Cloud Backup

* Firebase integration
* Secure cloud sync
* Multi-device support

### Medical Reports

* PDF exports
* Printable reports
* Physician summaries

### Emergency Features

* Emergency contacts
* Quick access information
* Medical information cards

---

## Motivation

Shalom was created to help caregivers accurately track neurological and functional episodes while focusing on the well-being of the person they are caring for.

By providing detailed records, Shalom aims to support better communication between caregivers and healthcare professionals while reducing the stress of manually recording events during an episode.

---

## License

MIT License

---

## Author

Joshua Derival

Created with the goal of providing caregivers with a simple, reliable, and accessible tool for episode tracking and documentation.
